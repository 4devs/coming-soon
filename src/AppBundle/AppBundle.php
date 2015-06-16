<?php

namespace AppBundle;

use Doctrine\Bundle\DoctrineBundle\DependencyInjection\Compiler\DoctrineOrmMappingsPass;
use Doctrine\Bundle\MongoDBBundle\DependencyInjection\Compiler\DoctrineMongoDBMappingsPass;
use MyProject\Proxies\__CG__\OtherProject\Proxies\__CG__\stdClass;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class AppBundle extends Bundle
{
    /**
     * {@inheritDoc}
     */
    public function getParent()
    {
        return 'FDevsContactUsBundle';
    }

    /**
     * {@inheritDoc}
     */
    public function build(ContainerBuilder $container)
    {
        parent::build($container);

        $this->addRegisterMappingsPass($container);
    }

    /**
     * @param ContainerBuilder $container
     */
    private function addRegisterMappingsPass(ContainerBuilder $container)
    {
        $mappings = [realpath(__DIR__.'/Resources/config/doctrine/model') => 'AppBundle\Model'];

        if (class_exists('Doctrine\Bundle\MongoDBBundle\DependencyInjection\Compiler\DoctrineMongoDBMappingsPass')) {
            $container->addCompilerPass(
                DoctrineMongoDBMappingsPass::createXmlMappingDriver(
                    $mappings,
                    ['f_devs_contact_us.model_manager_name'],
                    'f_devs_contact_us.backend_type_mongodb'
                )
            );
        } else if (class_exists('Doctrine\Bundle\DoctrineBundle\DependencyInjection\Compiler\DoctrineOrmMappingsPass')) {
            $container->addCompilerPass(
                DoctrineOrmMappingsPass::createXmlMappingDriver(
                    $mappings,
                    ['fos_user.model_manager_name'],
                    'f_devs_contact_us.backend_type_orm'
                )
            );
        }
    }

}
