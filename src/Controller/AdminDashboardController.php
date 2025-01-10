<?php

namespace App\Controller;

use App\Service\StatsService;
use App\Repository\CvRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AdminDashboardController extends AbstractController
{
  
    /**
     * Admin Dashboard
     *
     * @param EntityManagerInterface $manager
     * @param CvRepository $cvRepo
     * @param StatsService $stats
     * @return Response
     */
    #[Route('/admin', name: 'admin_dashboard')]
    public function index(EntityManagerInterface $manager, CvRepository $cvRepo, StatsService $stats): Response
    {
        // Compter le nombre total d'utilisateurs
        $totalMedia = $stats->getProjectsCount();
        $totalSkills = $stats->getSkillsCount();
        $cv=$cvRepo->findAll();
    
        return $this->render('admin/dashboard/index.html.twig', [
            'stats' => [
                'allProjects' => $totalMedia,
                'allSkills' => $totalSkills,
              
         
            ],
            'cv'=>$cv,
        ]);
    }
}
