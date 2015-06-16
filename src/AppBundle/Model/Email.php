<?php

namespace AppBundle\Model;

use FDevs\ContactUsBundle\Model\EmailInterface;
use FDevs\ContactUsBundle\Model\Email as BaseEmail;

class Email extends BaseEmail implements EmailInterface
{
    /**
     * @var mixed
     */
    protected $id;

    /**
     * init.
     */
    public function __construct($ip = '')
    {
        $this->setClientIp($ip);
        $this->setCreatedAt(new \DateTime());
    }
}
