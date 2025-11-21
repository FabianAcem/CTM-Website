<?php
/**
 * CTM Landing Page - Custom API Endpoints für Headless CMS
 * Diese Datei muss in das aktive WordPress Theme eingefügt werden
 */

// Verhindert direkten Zugriff
if (!defined('ABSPATH')) {
    exit;
}

/**
 * 1. CUSTOM API ENDPOINT REGISTRIERUNG
 */
add_action('rest_api_init', function () {
    register_rest_route('ctm/v1', '/data/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'ctm_get_page_data',
        'args' => array(
            'id' => array(
                'validate_callback' => function($param, $request, $key) {
                    return is_numeric($param);
                }
            ),
        ),
        'permission_callback' => '__return_true' // Öffentlich zugänglich
    ));
});

/**
 * 2. HAUPTFUNKTION: ACF DATEN ABRUFEN UND STRUKTURIEREN
 */
function ctm_get_page_data($data) {
    $page_id = $data['id'];
    
    // Prüfen ob die Seite existiert
    $page = get_post($page_id);
    if (!$page || $page->post_type !== 'page') {
        return new WP_Error('no_page', 'Seite nicht gefunden', array('status' => 404));
    }

    // Alle ACF Felder abrufen
    $fields = get_fields($page_id);
    
    if (!$fields) {
        $fields = array();
    }

    // Debug-Information hinzufügen
    $fields['_debug'] = array(
        'page_id' => $page_id,
        'page_title' => $page->post_title,
        'fields_count' => count($fields),
        'timestamp' => current_time('mysql')
    );

    // CORS Headers hinzufügen
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET');
    header('Access-Control-Allow-Headers: Content-Type');

    return $fields;
}

/**
 * 3. CORS UNTERSTÜTZUNG
 */
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        return $value;
    });
});

/**
 * 4. ACF INTEGRATION SICHERSTELLEN
 */
add_action('acf/init', 'ctm_acf_init');
function ctm_acf_init() {
    // Prüfen ob ACF aktiv ist
    if (!function_exists('acf_add_local_field_group')) {
        add_action('admin_notices', function() {
            echo '<div class="notice notice-error"><p>CTM Landing Page: Advanced Custom Fields Plugin ist erforderlich!</p></div>';
        });
        return;
    }
    
    // Optional: Debug-Info in WordPress Admin
    if (is_admin()) {
        add_action('admin_notices', function() {
            $api_url = home_url('/wp-json/ctm/v1/data/');
            echo '<div class="notice notice-info"><p>CTM API aktiv: <a href="' . $api_url . '2" target="_blank">' . $api_url . '2</a></p></div>';
        });
    }
}

/**
 * 5. CACHE BUSTING FÜR ENTWICKLUNG
 */
add_filter('rest_cache_headers', function($headers) {
    if (defined('WP_DEBUG') && WP_DEBUG) {
        $headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
        $headers['Pragma'] = 'no-cache';
        $headers['Expires'] = '0';
    }
    return $headers;
});

/**
 * 6. WORDPRESS ADMIN: SEITEN-ID ANZEIGEN
 */
add_action('admin_init', function() {
    add_action('edit_form_top', function($post) {
        if ($post->post_type === 'page') {
            echo '<div style="background: #f0f8ff; padding: 10px; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 5px;">';
            echo '<strong>CTM API Info:</strong> Diese Seite hat die ID <code>' . $post->ID . '</code><br>';
            echo 'API URL: <a href="' . home_url('/wp-json/ctm/v1/data/' . $post->ID) . '" target="_blank">' . home_url('/wp-json/ctm/v1/data/' . $post->ID) . '</a>';
            echo '</div>';
        }
    });
});

/**
 * 7. ACF JSON PFAD KONFIGURATION
 */
add_filter('acf/settings/save_json', function($path) {
    // Speichere ACF JSON in theme/acf-json Ordner
    return get_stylesheet_directory() . '/acf-json';
});

add_filter('acf/settings/load_json', function($paths) {
    // Lade ACF JSON aus theme/acf-json Ordner
    $paths[] = get_stylesheet_directory() . '/acf-json';
    return $paths;
});