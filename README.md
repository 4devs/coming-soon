Coming Soon Project
===================

Coming Soon project - a fully-functional Symfony2
application that you can use as the skeleton for your new applications.

Installation
------------

create with [composer][17]

```bash
$ composer create-project fdevs/coming-soon coming
$ cd coming
```

Setting up Permissions using ACL on a system that supports chmod +a, or use any other [method][1] to folders `var/cache var/logs var/spool` 

```bash
$ rm -rf var/cache/*
$ rm -rf var/logs/*
$ rm -rf var/spool/*

$ HTTPDUSER=`ps aux | grep -E '[a]pache|[h]ttpd|[_]www|[w]ww-data|[n]ginx' | grep -v root | head -1 | cut -d\  -f1`
$ sudo chmod +a "$HTTPDUSER allow delete,write,append,file_inherit,directory_inherit" var/cache var/logs var/spool
$ sudo chmod +a "`whoami` allow delete,write,append,file_inherit,directory_inherit" var/cache var/logs var/spool
```

add you project to [web server][18]

add to cron task

```bash
$ bin/console swiftmailer:spool:send
```

Installs bundles web assets under a public web directory
 
```bash
$ bin/console assets:install
```

Use with Doctrine ORM
---------------------

* Install the [Doctrine Bundle](http://symfony.com/doc/master/bundles/DoctrineBundle/installation.html) and [Doctrine ORM](https://github.com/doctrine/doctrine2)
 
```bash
$ composer require doctrine/orm
$ composer require doctrine/doctrine-bundle
```

```php
//app/AppKernel.php
<?php

use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\Config\Loader\LoaderInterface;

class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = array(
        //...
        new Doctrine\Bundle\DoctrineBundle\DoctrineBundle(),
        );
    }
}

```

* Configuring the [Databases and Doctrine](http://symfony.com/doc/current/book/doctrine.html#a-simple-example-a-product)

```yml
#app/config/config.yml
# Doctrine Configuration
doctrine:
    dbal:
        driver:   pdo_mysql
        host:     "%database_host%"
        port:     "%database_port%"
        dbname:   "%database_name%"
        user:     "%database_user%"
        password: "%database_password%"
        charset:  UTF8
        # if using pdo_sqlite as your database driver:
        #   1. add the path in parameters.yml
        #     e.g. database_path: "%kernel.root_dir%/data/data.db3"
        #   2. Uncomment database_path in parameters.yml.dist
        #   3. Uncomment next line:
        #     path:     "%database_path%"

    orm:
        auto_generate_proxy_classes: "%kernel.debug%"
        naming_strategy: doctrine.orm.naming_strategy.underscore
        auto_mapping: true
```

```yml
#app/config/parameters.yml and app/config/parameters.yml.dist
parameters:
#...
    database_host: 127.0.0.1
    database_port: null
    database_name: symfony
    database_user: root
    database_password: null
```

* modify `app/config/config.yml`

```yml
f_devs_contact_us:
#....
    database:
        db_driver: 'orm'
```
#### add support [SonataAdmin](https://sonata-project.org/bundles/)

* install [SonataAdminBundle](https://sonata-project.org/bundles/admin/2-3/doc/reference/installation.html)

```bash
$ composer require sonata-project/admin-bundle
```

```php
//app/AppKernel.php
public function registerBundles()
{
    $bundles = array(
        //...
        new Sonata\CoreBundle\SonataCoreBundle(),
        new Sonata\BlockBundle\SonataBlockBundle(),
        new Knp\Bundle\MenuBundle\KnpMenuBundle(),
        new Sonata\AdminBundle\SonataAdminBundle(),
    );
}
```


* install [Doctrine ORM Admin Bundle](https://sonata-project.org/bundles/doctrine-orm-admin/2-2/doc/reference/installation.html)

```bash
$ composer require sonata-project/doctrine-orm-admin-bundle
```

```php
//app/AppKernel.php
public function registerBundles()
{
    $bundles = array(
        //...
        new Sonata\DoctrineORMAdminBundle\SonataDoctrineORMAdminBundle(),
     );
}
```

* add to `app/config/config.yml`

```yml
sonata_block:
    default_contexts: [cms]
    blocks:
        sonata.admin.block.admin_list:
            contexts:   [admin]
        
sonata_admin:
    security:
        acl_user_manager: fos_user.user_manager
    title: 4devs company
    dashboard:
        groups:
            label.contactUs:
                label_catalogue: FDevsContactUsBundle
                items:
                    - f_devs_contact_us.admin.contact_us
```

* add to `app/config/routing.yml`
    
```yml
admin:
    resource: '@SonataAdminBundle/Resources/config/routing/sonata_admin.xml'
    prefix: /admin

_sonata_admin:
    resource: .
    type: sonata_admin
    prefix: /admin
```

* modify `app/config/config.yml`
    
```yml
f_devs_contact_us:
    database:
        admin_service: 'sonata'
```

Use with Doctrine Mongodb
-------------------------

* Install the [Doctrine MongoDB Bundle](http://symfony.com/doc/master/bundles/DoctrineMongoDBBundle/index.html) and [Doctrine MongoDB](https://packagist.org/packages/doctrine/mongodb-odm)
 
```bash
$ composer require doctrine/mongodb-odm
$ composer require doctrine/mongodb-odm-bundle
```

```php
//app/AppKernel.php
<?php

use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\Config\Loader\LoaderInterface;

class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = array(
        //...
        new Doctrine\Bundle\MongoDBBundle\DoctrineMongoDBBundle(),
        );
    }
}

```

* Configuring the [Doctrine MongoDB](http://symfony.com/doc/master/bundles/DoctrineMongoDBBundle/index.html#configuration)

```yml
#app/config/config.yml
doctrine_mongodb:
    connections:
        default:
            server: "%default_server%"
            options: {}
    default_database: "%default_database%"
    document_managers:
        default:
            auto_mapping: true
```

```yml
#app/config/parameters.yml and app/config/parameters.yml.dist
parameters:
#...
    default_database: coming
    default_server: 'mongodb://localhost:27017'
```

* modify `app/config/config.yml`

```yml
f_devs_contact_us:
#....
    database:
        db_driver: 'mongodb'
```
#### add support [SonataAdmin](https://sonata-project.org/bundles/)

* install [SonataAdminBundle](https://sonata-project.org/bundles/admin/2-3/doc/reference/installation.html)

```bash
$ composer require sonata-project/admin-bundle
```

```php
//app/AppKernel.php
public function registerBundles()
{
    $bundles = array(
        //...
        new Sonata\CoreBundle\SonataCoreBundle(),
        new Sonata\BlockBundle\SonataBlockBundle(),
        new Knp\Bundle\MenuBundle\KnpMenuBundle(),
        new Sonata\AdminBundle\SonataAdminBundle(),
    );
}
```


* install [Doctrine MongoDB Admin Bundle](https://sonata-project.org/bundles/mongo-admin/master/doc/reference/installation.html)

```bash
$ composer require sonata-project/doctrine-mongodb-admin-bundle
```

```php
//app/AppKernel.php
public function registerBundles()
{
    $bundles = array(
        //...
        new Sonata\DoctrineMongoDBAdminBundle\SonataDoctrineMongoDBAdminBundle(),
     );
}
```

* add to `app/config/config.yml`

```yml
sonata_block:
    default_contexts: [cms]
    blocks:
        sonata.admin.block.admin_list:
            contexts:   [admin]
        
sonata_admin:
    security:
        acl_user_manager: fos_user.user_manager
    title: 4devs company
    dashboard:
        groups:
            label.contactUs:
                label_catalogue: FDevsContactUsBundle
                items:
                    - f_devs_contact_us.admin.contact_us
```

* add to `app/config/routing.yml`
    
```yml
admin:
    resource: '@SonataAdminBundle/Resources/config/routing/sonata_admin.xml'
    prefix: /admin

_sonata_admin:
    resource: .
    type: sonata_admin
    prefix: /admin
```

* modify `app/config/config.yml`
    
```yml
f_devs_contact_us:
    database:
        admin_service: 'sonata'
```

What's inside?
--------------

The Coming Soon is configured with the following defaults:

  * An AppBundle you can use to start coding;

  * Twig as the only configured template engine;

  * Swiftmailer;

  * Annotations enabled for everything.

It comes pre-configured with the following bundles:

  * **FrameworkBundle** - The core Symfony framework bundle

  * [**SensioFrameworkExtraBundle**][6] - Adds several enhancements, including
    template and routing annotation capability

  * [**TwigBundle**][8] - Adds support for the Twig templating engine

  * [**SecurityBundle**][9] - Adds security by integrating Symfony's security
    component

  * [**SwiftmailerBundle**][10] - Adds support for Swiftmailer, a library for
    sending emails

  * [**MonologBundle**][11] - Adds support for Monolog, a logging library


  * [**AsseticBundle**][12] - Adds support for Assetic, an asset processing
    library

  * **WebProfilerBundle** (in dev/test env) - Adds profiling functionality and
    the web debug toolbar

  * **SensioDistributionBundle** (in dev/test env) - Adds functionality for
    configuring and working with Symfony distributions

  * [**SensioGeneratorBundle**][13] (in dev/test env) - Adds code generation
    capabilities

  * [**FDevsContactUsBundle**][14] (in dev/test env) - Mail keeps the user in a convenient form
  
  
  * [**FDevsContactListBundle**][15] (in dev/test env) - concludes your contacts simple
  
  
  * [**LuneticsLocaleBundle**][16] (in dev/test env) - allows you to guess the Locale

All libraries and bundles included are released under the MIT or BSD license.

Enjoy!

[1]:  http://symfony.com/doc/current/book/installation.html#checking-symfony-application-configuration-and-setup
[4]:  https://sonata-project.org/bundles/admin/master/doc/reference/installation.html
[6]:  http://symfony.com/doc/2.7/bundles/SensioFrameworkExtraBundle/index.html
[8]:  http://symfony.com/doc/2.7/book/templating.html
[9]:  http://symfony.com/doc/2.7/book/security.html
[10]: http://symfony.com/doc/2.7/cookbook/email.html
[11]: http://symfony.com/doc/2.7/cookbook/logging/monolog.html
[12]: http://symfony.com/doc/2.7/cookbook/assetic/asset_management.html
[13]: http://symfony.com/doc/2.7/bundles/SensioGeneratorBundle/index.html
[14]: https://github.com/4devs/ContactUsBundle
[15]: https://github.com/4devs/ContactListBundle
[16]: https://github.com/lunetics/LocaleBundle
[17]: https://getcomposer.org/
[18]: http://symfony.com/doc/current/cookbook/configuration/web_server_configuration.html
