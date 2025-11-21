<?php
/**
 * CTM Landing Theme Functions - KORRIGIERTE VERSION
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

$absolute_acf_json_path = 'C:/Users/acemf/Local Sites/ctm-landing/app/public/wp-content/themes/ctm-landing/acf-json'; 

add_filter('acf/settings/save_json', 'ctm_acf_json_save_point_final');
function ctm_acf_json_save_point_final( $path ) {
    global $absolute_acf_json_path;
    return $absolute_acf_json_path;
}

add_filter('acf/settings/load_json', 'ctm_acf_json_load_point_final');
function ctm_acf_json_load_point_final( $paths ) {
    global $absolute_acf_json_path;
    $paths = array($absolute_acf_json_path);
    return $paths;
}

function ctm_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'gallery', 'caption'));
}
add_action('after_setup_theme', 'ctm_theme_setup');

// ====================================================================
// KORRIGIERTE DATENEXPORT FUNKTION - FLACHE STRUKTUR
// ====================================================================
function ctm_prepare_wordpress_data($post_id = null) {
    if (!$post_id) {
        $post_id = get_the_ID();
    }
    
    // ALLE FELDER FLACH AUSLESEN (wie React sie erwartet)
    $all_fields = get_fields($post_id);
    
    if (!$all_fields) {
        $all_fields = array();
    }

    // Template Directory für Bilder hinzufügen
    $all_fields['templateDir'] = set_url_scheme(get_template_directory_uri(), is_ssl() ? 'https' : 'http');
    
    // Debug Info
    $all_fields['_debug'] = array(
        'page_id' => $post_id,
        'page_title' => get_the_title($post_id),
        'fields_count' => count($all_fields),
        'timestamp' => current_time('mysql'),
        'api_version' => '1.1'
    );

    return $all_fields;
}

// ====================================================================
// API ENDPOINT REGISTRIERUNG
// ====================================================================
function ctm_register_api_endpoints() {
    register_rest_route( 'ctm/v1', '/data/(?P<page_id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'ctm_get_page_data_for_api',
        'permission_callback' => '__return_true',
        'args' => array(
            'page_id' => array(
                'validate_callback' => function($param, $request, $key) {
                    return is_numeric($param);
                }
            ),
        )
    ));
}
add_action( 'rest_api_init', 'ctm_register_api_endpoints' );

function ctm_get_page_data_for_api( $data ) {
    $page_id = (int) $data['page_id'];
    
    // Prüfen ob Seite existiert
    $page = get_post($page_id);
    if (!$page || $page->post_type !== 'page') {
        return new WP_Error('no_page', 'Seite nicht gefunden', array('status' => 404));
    }
    
    $all_data = ctm_prepare_wordpress_data($page_id);
    
    if (empty($all_data)) {
        return new WP_Error( 'no_data', 'Keine ACF-Daten gefunden.', array( 'status' => 404 ) );
    }
    
    return $all_data;
}

// ====================================================================
// CORS HEADERS FÜR ENTWICKLUNG
// ====================================================================
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        return $value;
    });
});

// Cache busting für Entwicklung
add_filter('rest_cache_headers', function($headers) {
    if (defined('WP_DEBUG') && WP_DEBUG) {
        $headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
        $headers['Pragma'] = 'no-cache';
        $headers['Expires'] = '0';
    }
    return $headers;
});

// ====================================================================
// ADMIN HELPER: ZEIGE API URL IN PAGE EDITOR
// ====================================================================
add_action('edit_form_after_title', function($post) {
    if ($post->post_type === 'page') {
        $api_url = home_url("/wp-json/ctm/v1/data/{$post->ID}");
        echo '<div style="background: #e7f3ff; border: 1px solid #b3d9ff; border-radius: 5px; padding: 10px; margin: 10px 0;">';
        echo '<strong>🔗 CTM API Info:</strong><br>';
        echo 'Page ID: <code>' . $post->ID . '</code><br>';
        echo 'API URL: <a href="' . $api_url . '" target="_blank" style="color: #0073aa;">' . $api_url . '</a>';
        echo '</div>';
    }
});

// ====================================================================
// ACF FIELD VALIDATION
// ====================================================================
add_action('acf/init', function() {
    if (!function_exists('get_field')) {
        add_action('admin_notices', function() {
            echo '<div class="notice notice-error"><p><strong>CTM Landing:</strong> Advanced Custom Fields Plugin ist nicht aktiv!</p></div>';
        });
    }
});
?>