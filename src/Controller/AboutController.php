<?php

namespace App\Controller;

use App\Repository\SkillRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AboutController extends AbstractController
{
    /**
     * Page à propos
     *
     * @return Response
     */
    #[Route('/about', name: 'about')]
    public function index(SkillRepository $skillRepository): Response
    {
        $allSkills = $skillRepository->findBy([], ['name' => 'ASC']);   
        return $this->render('about/index.html.twig', [
            'skillsAll' => $allSkills,
         
        ]);
    }
}
