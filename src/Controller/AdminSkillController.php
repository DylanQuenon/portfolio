<?php

namespace App\Controller;

use App\Entity\Skill;
use App\Form\SkillType;
use App\Entity\ImgModify;
use App\Form\SearchsType;
use App\Form\SkillEditType;
use App\Form\ImgModifyMainType;
use App\Service\PaginationService;
use App\Repository\SkillRepository;
use App\Service\FileUploaderService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AdminSkillController extends AbstractController
{
    /**
     * Lister les compétences
     *
     * @param SkillRepository $repo
     * @param PaginationService $pagination
     * @param integer $page
     * @return Response
     */
    #[Route('/admin/skill/{page<\d+>?1}', name: 'admin_skills_index')]
    public function index(SkillRepository $repo, Request $request, PaginationService $pagination, int $page): Response
    {
        $form = $this->createForm(SearchsType::class);
        $form->handleRequest($request);
        $isSubmitted=false;

        if ($form->isSubmitted() && $form->isValid()) {
            $query = $form->get('query')->getData();
            $isSubmitted=true;
            $skills = $repo->searchSkillsbyName($query);
        }else{
            $pagination->setDataSource(Skill::class)->setPage($page)->setLimit(9)->setRoute('admin_skills_index');
            $skills = $pagination->getData();

        }
   
        return $this->render('admin/skill/index.html.twig', [
            'pagination' => $pagination,
            'skills' => $skills,
            'searchForm' => $form->createView(),
            'isSubmitted'=>$isSubmitted
        ]);
    }

    /**
     * Ajouter une compétence
     *
     * @param Request $request
     * @param EntityManagerInterface $manager
     * @param FileUploaderService $fileUploader
     * @return Response
     */
    #[Route('/admin/skill/new', name: 'admin_skill_new')]
    public function new(Request $request, EntityManagerInterface $manager, FileUploaderService $fileUploader): Response
    {
        $skill = new Skill();
        $form = $this->createForm(SkillType::class, $skill);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
           $file = $form['logo']->getData();
            if($file){
                $imageName = $fileUploader->upload($file);
                $skill->setLogo($imageName);
            }
            $manager->persist($skill);
            $manager->flush();

            $this->addFlash('success', 'La compétence a été ajoutée avec succès.');

            return $this->redirectToRoute('admin_skills_index');
        }

        return $this->render('admin/skill/new.html.twig', [
            'myForm' => $form->createView(),
        ]);
    }

    /**
     * Modifier une compétence
     *
     * @param Skill $skill
     * @param Request $request
     * @param EntityManagerInterface $manager
     * @return Response
     */
    #[Route("/admin/skill/{id}/edit", name: "admin_skill_edit")]
    public function edit(Skill $skill, Request $request, EntityManagerInterface $manager): Response
    {
        $picture = $skill->getLogo();
        if(!empty($picture)){
            $skill->setLogo(
                new File($this->getParameter('uploads_directory').'/'.$skill->getLogo())
            );
        }

        $form = $this->createForm(SkillEditType::class, $skill);
        $form->handleRequest($request);
    
        if ($form->isSubmitted() && $form->isValid()) {
            $skill
                ->setLogo($picture);
        
            $manager->persist($skill);
            $manager->flush();
    
            $this->addFlash(
                'success',
                "La compétence <strong>".$skill->getName()."</strong> a bien été modifiée"
            );
    
            return $this->redirectToRoute('admin_skills_index');
        }
    
        return $this->render("admin/skill/edit.html.twig",[
            "skill" => $skill,
            "myForm" => $form->createView(),
     
        ]);
    }
    /**
     * Modifier le logo
     *
     * @param Request $request
     * @param EntityManagerInterface $manager
     * @param Skill $skill
     * @param FileUploaderService $fileUploader
     * @return Response
     */
    #[Route("/admin/skill/{id}/imgmodify", name:"admin_skill_img")]
    public function imgModify(Request $request, EntityManagerInterface $manager, Skill $skill, FileUploaderService $fileUploader): Response
    {
        $imgModify = new ImgModify();
        $form = $this->createForm(ImgModifyMainType::class, $imgModify);
        $form->handleRequest($request);
        
        if($form->isSubmitted() && $form->isValid())
        {
            if(!$skill->getLogo() || !empty($skill->getLogo()))
            {
                unlink($this->getParameter('uploads_directory').'/'.$skill->getLogo());
            }
                // gestion de l'image
                $file = $form['newPicture']->getData();
                if($file){
                    $imageName = $fileUploader->upload($file);
                    $skill->setLogo($imageName);
                }
                $manager->persist($skill);
                $manager->flush();

                $this->addFlash(
                'success',
                'Le logo a bien été modifié'
                );

                return $this->redirectToRoute('admin_skills_index');
        }

        return $this->render("admin/skill/imgModify.html.twig",[
            'myForm' => $form->createView(),
            
        'skill' => $skill 
            
        ]);
    }

    /**
     * Effacer une compétence
     *
     * @param Skill $skill
     * @param EntityManagerInterface $manager
     * @return Response
     */
    #[Route("/admin/skill/{id}/delete", name: "admin_skill_delete")]
    public function delete(Skill $skill, EntityManagerInterface $manager): Response
    {
        if(!empty($skill->getLogo()))
        {
            unlink($this->getParameter('uploads_directory').'/'.$skill->getLogo());
        }
        $this->addFlash(
            "success",
            "L'acteur <strong>".$skill->getName()."</strong> a bien été supprimé"
        );
        $manager->remove($skill);
        $manager->flush();
        
        return $this->redirectToRoute('admin_skills_index');
    }


}
