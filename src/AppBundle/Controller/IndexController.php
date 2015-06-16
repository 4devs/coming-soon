<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class IndexController extends Controller
{
    /**
     * @Route("/{_locale}", name="homepage_locale", defaults={"_locale":"en"},requirements={"_locale":"\w{2}"})
     * @Template
     */

    public function indexAction()
    {
        return ['end_date' => $this->getParameter('end_date')];
    }
}
