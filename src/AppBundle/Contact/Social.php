<?php

namespace AppBundle\Contact;

use FDevs\ContactList\FactoryInterface;

class Social
{
    public function social(FactoryInterface $factory, array $options = [])
    {
        $contact = $factory->createContact('social');
        $factory->addConnect($contact, 'home', 'Blog', 'http://4devs.io/');
        $factory->addConnect($contact, 'github', 'coming-soon', 'https://github.com/4devs/coming-soon');

        return $contact;
    }
}