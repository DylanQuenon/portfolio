<?php

namespace App\Controller;

use App\Entity\Cv;
use App\Form\CvType;
use App\Entity\FileModify;
use App\Form\FileModifyType;
use App\Repository\CvRepository;
use App\Service\PaginationService;
use App\Service\FileUploaderService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AdminCvController extends AbstractController
{
    /**
     * Lister les cv
     *
     * @param CvRepository $repo
     * @param PaginationService $pagination
     * @param integer $page
     * @return Response
     */
    #[Route('/admin/cv/{page<\d+>?1}', name: 'admin_cv_index')]
    public function index(CvRepository $repo, PaginationService $pagination, int $page): Response
    {
        $pagination->setDataSource(Cv::class)->setPage($page)->setLimit(9)->setRoute('admin_cv_index');
        $cv = $pagination->getData();
        return $this->render('admin/cv/index.html.twig', [
            'pagination' => $pagination,
            'cv' => $cv,
        ]);
    }

    /**
     * Créer un nouveau CV
     *
     * @param Request $request
     * @param EntityManagerInterface $manager
     * @param FileUploaderService $fileUploader
     * @return Response
     */
    #[Route('/admin/cv/new', name: 'admin_cv_new')]
    public function new(Request $request, EntityManagerInterface $manager, FileUploaderService $fileUploader): Response
    {// Vérifier s'il existe déjà un CV dans la base de données
        $existingCv = $manager->getRepository(Cv::class)->findOneBy([]);

        if ($existingCv) {
            $this->addFlash('error', 'Un CV existe déjà dans la base de données.');
            return $this->redirectToRoute('admin_cv_index');
        }

        $cv = new Cv();
        $form = $this->createForm(CvType::class, $cv);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $file = $form['filepath']->getData();
            if ($file) {
                $imageName = $fileUploader->upload($file);
                $cv->setFilepath($imageName);
            }
            $manager->persist($cv);
            $manager->flush();

            $this->addFlash('success', 'Le projet a été ajouté avec succès.');

            return $this->redirectToRoute('admin_cv_index');
        }

        return $this->render('admin/cv/new.html.twig', [
            'myForm' => $form->createView(),
        ]);
    }

    /**
     * Modifier le cv
     *
     * @param Request $request
     * @param EntityManagerInterface $manager
     * @param Cv $cv
     * @param FileUploaderService $fileUploader
     * @return Response
     */
    #[Route("/admin/cv/{id}/fileModify", name:"admin_cv_edit")]
    public function fileModify(Request $request, EntityManagerInterface $manager, Cv $cv, FileUploaderService $fileUploader): Response
    {
        $fileModify = new FileModify();
        $form = $this->createForm(FileModifyType::class, $fileModify);
        $form->handleRequest($request);
        
        if($form->isSubmitted() && $form->isValid())
        {
            if(!$cv->getFilepath() || !empty($cv->getFilepath()))
            {
                unlink($this->getParameter('uploads_directory').'/'.$cv->getFilepath());
            }
                // gestion de l'image
                $file = $form['newFile']->getData();
                if($file){
                    $imageName = $fileUploader->upload($file);
                    $cv->setFilepath($imageName);
                }
                $manager->persist($cv);
                $manager->flush();

                $this->addFlash(
                'success',
                'Le fichier a bien été modifié'
                );

                return $this->redirectToRoute('admin_cv_index');
        }

        return $this->render("admin/cv/edit.html.twig",[
            'myForm' => $form->createView(),
            
        'cv' => $cv 
            
        ]);
    }

    /**
     * Effacer le cv
     *
     * @param Cv $cv
     * @param EntityManagerInterface $manager
     * @return Response
     */
    #[Route("/admin/cv/{id}/delete", name: "admin_cv_delete")]
    public function delete(Cv $cv, EntityManagerInterface $manager): Response
    {
        if(!empty($cv->getFilepath() && $cv->getFilepath() !== null))
        {
            unlink($this->getParameter('uploads_directory').'/'.$cv->getFilepath());
        }
        $this->addFlash(
            "success",
            "Le cv <strong>".$cv->getId()."</strong> a bien été supprimé"
        );
        $manager->remove($cv);
        $manager->flush();
        
        return $this->redirectToRoute('admin_cv_index');
    }
  
}
