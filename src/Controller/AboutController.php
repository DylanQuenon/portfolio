<?php

namespace App\Controller;

use App\Repository\SkillRepository;
use App\Repository\ProjectRepository;
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
    public function index(SkillRepository $skillRepository, ProjectRepository $projectRepository): Response
    {
        $allSkills = $skillRepository->findBy([], ['name' => 'ASC']);  
        $recentProjects = $projectRepository->findBy([], ['date' => 'DESC'], 9);
        return $this->render('about/index.html.twig', [
            'skillsAll' => $allSkills,
            'projects' => $recentProjects,
         
        ]);
    }
}
