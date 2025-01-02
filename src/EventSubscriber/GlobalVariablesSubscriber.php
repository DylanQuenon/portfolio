<?php

namespace App\EventSubscriber;

use App\Repository\CvRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Twig\Environment;

class GlobalVariablesSubscriber implements EventSubscriberInterface
{
    private $twig;
    private $cvRepository;

    public function __construct(Environment $twig, CvRepository $cvRepository)
    {
        $this->twig = $twig;
        $this->cvRepository = $cvRepository;
    }

    public function onKernelController(ControllerEvent $event): void
    {
        // Récupérer le premier CV
        $cv = $this->cvRepository->getFirstCv();

        // Si un CV est trouvé, ajouter son ID comme variable globale
        if ($cv) {
            $this->twig->addGlobal('cvId', $cv->getId());
        }
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::CONTROLLER => 'onKernelController',
        ];
    }
}
