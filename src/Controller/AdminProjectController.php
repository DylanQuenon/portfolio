<?php

namespace App\Controller;

use App\Entity\Project;
use App\Entity\ImgModify;
use App\Form\ProjectType;
use App\Form\ProjectEditType;
use App\Form\ImgModifyMainType;
use App\Service\PaginationService;
use App\Service\FileUploaderService;
use App\Repository\ProjectRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AdminProjectController extends AbstractController
{
    #[Route('/admin/project/{page<\d+>?1}', name: 'admin_projects_index')]
    public function index(ProjectRepository $repo, PaginationService $pagination, int $page): Response
    {
        $pagination->setDataSource(Project::class)->setPage($page)->setLimit(9)->setRoute('admin_projects_index');
        $projects = $pagination->getData();

        return $this->render('admin/project/index.html.twig', [
            'pagination' => $pagination,
            'projects' => $projects,
        ]);
    }

    #[Route('/admin/project/new', name: 'admin_project_new')]
    public function new(Request $request, EntityManagerInterface $manager, FileUploaderService $fileUploader): Response
    {
        $project = new Project();
        $form = $this->createForm(ProjectType::class, $project);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
           $file = $form['cover']->getData();
            if($file){
                $imageName = $fileUploader->upload($file);
                $project->setCover($imageName);
            }

               
            foreach($project->getCategory() as $category)
            {
                $project->setCategory($category);
                $manager->persist($category);
            }
            $manager->persist($project);
            $manager->flush();

            $this->addFlash('success', 'Le projet a été ajouté avec succès.');

            return $this->redirectToRoute('admin_projects_index');
        }

        return $this->render('admin/project/new.html.twig', [
            'myForm' => $form->createView(),
        ]);
    }

    
    #[Route("/admin/project/{slug}/edit", name: "admin_project_edit")]
    public function edit(Project $project, Request $request, EntityManagerInterface $manager): Response
    {
        $picture = $project->getCover();
        if(!empty($picture)){
            $project->setCover(
                new File($this->getParameter('uploads_directory').'/'.$project->getCover())
            );
        }

        $form = $this->createForm(ProjectEditType::class, $project);
        $form->handleRequest($request);
    
        if ($form->isSubmitted() && $form->isValid()) {
            $project
                ->setCover($picture);

                foreach($project->getCategory() as $category)
                {
                    $project->setCategory($category);
                    $manager->persist($category);
                }
        
            $manager->persist($project);
            $manager->flush();
    
            $this->addFlash(
                'success',
                "Le projet <strong>".$project->getTitle()."</strong> a bien été modifié"
            );
    
            return $this->redirectToRoute('admin_projects_index');
        }
    
        return $this->render("admin/project/edit.html.twig",[
            "project" => $project,
            "myForm" => $form->createView(),
     
        ]);
    }

    #[Route("/admin/project/{slug}/imgmodify", name:"admin_project_img")]
    public function imgModify(Request $request, EntityManagerInterface $manager, Project $project, FileUploaderService $fileUploader): Response
    {
        $imgModify = new ImgModify();
        $form = $this->createForm(ImgModifyMainType::class, $imgModify);
        $form->handleRequest($request);
        
        if($form->isSubmitted() && $form->isValid())
        {
            if(!$project->getCover() || !empty($project->getCover()))
            {
                unlink($this->getParameter('uploads_directory').'/'.$project->getCover());
            }
                // gestion de l'image
                $file = $form['newPicture']->getData();
                if($file){
                    $imageName = $fileUploader->upload($file);
                    $project->setCover($imageName);
                }
                $manager->persist($project);
                $manager->flush();

                $this->addFlash(
                'success',
                'Le logo a bien été modifié'
                );

                return $this->redirectToRoute('admin_projects_index');
        }

        return $this->render("admin/project/imgModify.html.twig",[
            'myForm' => $form->createView(),
            
        'project' => $project 
            
        ]);
    }

    #[Route("/admin/project/{slug}/delete", name: "admin_project_delete")]
    public function delete(Project $project, EntityManagerInterface $manager): Response
    {
        if(!empty($project->getCover() && $project->getCover() !== null))
        {
            unlink($this->getParameter('uploads_directory').'/'.$project->getCover());
        }
        $this->addFlash(
            "success",
            "Le projet <strong>".$project->getTitle()."</strong> a bien été supprimé"
        );
        $manager->remove($project);
        $manager->flush();
        
        return $this->redirectToRoute('admin_projects_index');
    }
}
