<?php

namespace Deployer;

require 'recipe/common.php';
require 'recipe/npm.php';

// Configuration

set('repository', 'git@bitbucket.org:ideas2life/insuretech-webapp.git');
set('git_tty', true); // [Optional] Allocate tty for git on first deployment
set('shared_dirs', []);
set('shared_files', []);
set('writable_dirs', []);
set('allow_anonymous_stats', false);
set('default_timeout', 500);
// Hosts

host('predict-app.ideas2life.com.cy')->forwardAgent(false)
    ->stage('production')
    ->set('branch', 'master')
    ->user('predict')
    ->set('deploy_path', '/home/predict/web/predict-app.ideas2life.com.cy/project');

// Tasks

desc('Restart PHP-FPM service');
task('php-fpm:restart', function () {
// The user must have rights for restart service
// /etc/sudoers: username ALL=NOPASSWD:/bin/systemctl restart php-fpm.service
    run('sudo systemctl restart php-fpm.service');
});

task('migrate', function () {
    run('cd {{release_path}}  && ./mgrt migrate -e production');
});

task('whoami', function () {
    run('whoami');
});


desc('Install npm packages');
task('npm:dist', function () {
    if (has('previous_release')) {
        if (test('[ -d {{previous_release}}/dist ]')) {
            run('cp -R {{previous_release}}/dist {{release_path}}');
        }
    }
    run("cd {{release_path}} && {{bin/npm}} run ng build");
});

//after('deploy:symlink', 'php-fpm:restart');

desc('Deploy your project');
task('deploy', [
    'deploy:prepare',
    'whoami',
    'deploy:lock',
    'deploy:release',
    'deploy:update_code',
    'deploy:shared',
    'deploy:writable',
    'deploy:clear_paths',
    'deploy:symlink',
//    'migrate',
    'npm:install',
    'deploy:unlock',
    'cleanup',
    //  'success'
]);

// [Optional] if deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');
after('deploy:update_code', 'npm:install');
after('deploy:update_code', 'npm:dist');