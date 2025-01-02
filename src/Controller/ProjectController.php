<?php

namespace App\Controller;

use App\Entity\Project;
use App\Repository\ProjectRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ProjectController extends AbstractController
{
    #[Route('/project', name: 'app_project')]
    public function index(): Response
    {
        return $this->render('project/index.html.twig', [
            'controller_name' => 'ProjectController',
        ]);
    }

    #[Route('/project/{slug}', name: 'project_show')]
    public function show(Project $project, ProjectRepository $repo){
   

        // // Récupère les trois dernières actualités, excluant celle affichée
        $latestProjects = $repo->createQueryBuilder('p')
        ->where('p.id != :currentProjectId')
        ->setParameter('currentProjectId', $project->getId())
        ->orderBy('p.id', 'DESC')
        ->setMaxResults(9)
        ->getQuery()
        ->getResult();
           // Initialisation d'un tableau pour stocker tous les médias
     
        return $this->render('project/show.html.twig', [
            'project' => $project,
            'projects'=>$latestProjects
        ]);

    } 
}
