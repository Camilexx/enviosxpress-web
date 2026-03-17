module.exports = {
    apps: [{
        name: 'sophia',
        script: 'index.js',
        cwd: __dirname,

        // Auto-restart settings
        autorestart: true,
        watch: false,  // IMPORTANTE: no usar watch con .wwebjs_cache
        max_restarts: 10,
        restart_delay: 5000,

        // Memory management
        max_memory_restart: '350M',

        // Environment
        env: {
            NODE_ENV: 'production'
        },

        // Logging
        log_date_format: 'YYYY-MM-DD HH:mm:ss',
        error_file: './logs/sophia-error.log',
        out_file: './logs/sophia-out.log',
        merge_logs: true,

        // Graceful shutdown
        kill_timeout: 5000,
        listen_timeout: 10000,
    }]
};
