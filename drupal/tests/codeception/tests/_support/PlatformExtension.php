<?php

class PlatformExtension extends \Codeception\Extension
{

  public static $events = array(
    'test.before' => 'beforeTest',
  );

  public function beforeTest(\Codeception\Event\TestEvent $event) {

    codecept_debug('\PlatformExtension::beforeTest started...');

    // Workaround to get vars generated by circleci env.
    $env_file = getenv('BASH_ENV');
    if (empty($env_file)) {
      return;
    }

    $lines = file($env_file, FILE_IGNORE_NEW_LINES);
    foreach ($lines as $line) {
      $var = explode('=', $line);
      if (is_array($var) && count($var) > 1) {
        $_ENV[$var[0]] = str_replace('export ', '', $var[1]);
      }
    }

    codecept_debug($_ENV['BACKEND_URL']);
    codecept_debug($_ENV['FRONTEND_URL']);

    codecept_debug($_ENV['HTTP_USERNAME']);
    codecept_debug($_ENV['HTTP_PASSWORD']);

    // Get URL from CircleCI environment.
    // See circle.yml file to find how this var gets generated.
    $platform_url = $_ENV['BACKEND_URL'];

    // Get current test groups.
    $test_groups = $event->getTest()->getMetadata()->getGroups();

    // For tests in frontend-gifts group set frontend URL.
    if (in_array('frontend', $test_groups)) {
      $platform_url = $_ENV['FRONTEND_URL'];
    }


    if (!empty($platform_url)) {
      $url = rtrim($platform_url, "/");
      $url = $url['scheme'] . '://' . $_ENV['HTTP_USERNAME'] . ':' . $_ENV['HTTP_PASSWORD'] . '@' . $url['host'] . $url['path'];

      if ($this->hasModule('WebDriver')) {
        $this->getModule('WebDriver')->_reconfigure(['url' => $url]);
      }

      if ($this->hasModule('REST')) {
        $this->getModule('REST')->_reconfigure(['url' => $url]);
      }

      if ($this->hasModule('PhpBrowser')) {
        $this->getModule('PhpBrowser')->_reconfigure(['url' => $url]);
      }


    }
  }

}
