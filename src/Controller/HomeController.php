<?php

namespace App\Controller;

use App\Repository\SkillRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class HomeController extends AbstractController
{
    /**
     * Homepage
     *
     * @return Response
     */
    #[Route('/', name: 'homepage')]
    public function index(SkillRepository $skillRepository): Response
    {
        $allSkills = $skillRepository->findAll();

        // Mélanger les compétences pour obtenir un ordre aléatoire
        shuffle($allSkills);

        // Sélectionner les 4 premières compétences après le mélange
        $randomSkills = array_slice($allSkills, 0, 4);
        return $this->render('home.html.twig', [
            'controller_name' => 'HomeController',
            'skills' => $randomSkills,
        ]);
    }

    /**
     * Change the local variable
     *
     * @param [type] $locale
     * @param Request $request
     * @return void
     */
    #[Route('/change_locale/{locale}', name: 'change_locale')]
    public function changeLocale($locale, Request $request)
    {
        // stocke dans la session
        $request->getSession()->set('_locale', $locale);

        // On revient sur la page précédente
        return $this->redirect($request->headers->get('referer'));
    }
}
