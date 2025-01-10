<?php

namespace App\Controller;

use App\Entity\Project;
use App\Repository\SkillRepository;
use App\Repository\ProjectRepository;
use App\Repository\CategoryRepository;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ProjectController extends AbstractController
{
    /**
     * Liste des projets
     *
     * @param Request $request
     * @param ProjectRepository $repo
     * @param CategoryRepository $cateRepo
     * @param SkillRepository $skillRepo
     * @param PaginatorInterface $paginator
     * @param integer $page
     * @return Response
     */
    #[Route('/projects/{page<\d+>?1}', name: 'project_index')]
    public function index(Request $request, ProjectRepository $repo, CategoryRepository $cateRepo, SkillRepository $skillRepo, PaginatorInterface $paginator, int $page = 1): Response
    {
         $category = $request->query->get('category');
         $skill = $request->query->get('skill');
         $order = $request->query->get('order', 'newest'); // Valeur par défaut
         // Récupère tous les genres pour le filtre
         $categories = $cateRepo->findAll();

        if ($category === 'Design') {
            // Appeler la méthode du repository pour récupérer les compétences des projets Design
            $skills = $repo->findSkillsForCategoryDesign();
        } else {
            // Si ce n'est pas "Design", récupérer toutes les compétences
            $skills = $skillRepo->findAll();
        }

         // Initialisation de la requête de base
         $queryBuilder = $repo->createQueryBuilder('m');

         if ($category) {
             $queryBuilder
                 ->join('m.category', 'g')
                 ->andWhere('g.name = :category OR g.nameEn = :category')
                 ->setParameter('category', $category);
         }
     
         if ($skill) {
             $queryBuilder
                 ->join('m.languages', 's')
                 ->andWhere('s.name = :skill')
                 ->setParameter('skill', $skill);
         }
     
         // Ajoute un tri en fonction de l'ordre choisi
         if ($order === 'oldest') {
             $queryBuilder->orderBy('m.date', 'ASC');
         } else {
             $queryBuilder->orderBy('m.date', 'DESC');
         }
     
      
         $projects = $paginator->paginate(
             $queryBuilder, // La requête
             $request->query->getInt('page', $page),
             9 
         );
        return $this->render('project/index.html.twig', [
            'projects' => $projects,
            'categories' => $categories,
            'skills' => $skills,
            'currentGenre' => $category,
            'currentSkill' => $skill,
            'order' => $order, // Passe l'ordre à la vue

        ]);
    }


    /**
     * Affiche un projet
     *
     * @param Project $project
     * @param ProjectRepository $repo
     * @return void
     */
    #[Route('/projects/{slug}', name: 'project_show')]
    public function show(Project $project, ProjectRepository $repo){

        $latestProjects = $repo->createQueryBuilder('p')
        ->where('p.id != :currentProjectId')
        ->setParameter('currentProjectId', $project->getId())
        ->orderBy('p.id', 'DESC')
        ->setMaxResults(9)
        ->getQuery()
        ->getResult();
     
        return $this->render('project/show.html.twig', [
            'project' => $project,
            'projects'=>$latestProjects
        ]);

    } 

    /**
     * Search Ajax
     *
     * @param Request $request
     * @param ProjectRepository $repo
     * @return JsonResponse
     */
    #[Route('/projects/search/ajax', name: 'projects_search_ajax', methods: ['GET'])]
    public function searchAjax(Request $request, ProjectRepository $repo): JsonResponse
    {
        $query = $request->query->get('query', '');

        if (empty($query)) {
            return new JsonResponse([]); // Renvoie un tableau vide si aucun terme
        }

        $results = $repo->findByTitle($query)
            ->setMaxResults(10)
            ->getQuery()
            ->getResult();

        $jsonResults = array_map(function ($project) {
            return [
                'title' => $project->getTitle(),
                'slug' => $project->getSlug(),
                'cover' => $project->getCover(),
                'introEn' => substr($project->getIntroEn(), 0, 100) . "...",
                'intro' => substr($project->getIntro(), 0, 100) . "...",
                'date' => $project->getDate()->format('Y'),
            ];
        }, $results);

        return new JsonResponse($jsonResults);
    }
}
