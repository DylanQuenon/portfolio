<?php

namespace App\Controller;

use App\Entity\Category;
use App\Form\CategoryType;
use App\Service\PaginationService;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AdminCategoryController extends AbstractController
{
    /**
     * Liste toutes les catégories avec pagination
     *
     * @param CategoryRepository $repo
     * @param PaginationService $pagination
     * @param int $page
     * @return Response
     */
    #[Route('/admin/categories/{page<\d+>?1}', name: 'admin_category_index')]
    public function index(CategoryRepository $repo, PaginationService $pagination, int $page): Response
    {
        $pagination->setDataSource(Category::class)->setPage($page)->setLimit(9)->setRoute('admin_category_index');
        $categories = $pagination->getData();

        return $this->render('admin/category/index.html.twig', [
            'pagination' => $pagination,
            'categories' => $categories,
        ]);
    }

    /**
     * Ajouter une nouvelle catégorie
     *
     * @param Request $request
     * @param EntityManagerInterface $manager
     * @return Response
     */
    #[Route('/admin/category/new', name: 'admin_category_new')]
    public function new(Request $request, EntityManagerInterface $manager): Response
    {
        $category = new Category();
        $form = $this->createForm(CategoryType::class, $category);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $manager->persist($category);
            $manager->flush();

            $this->addFlash('success', 'La catégorie a été ajoutée avec succès.');

            return $this->redirectToRoute('admin_category_index');
        }

        return $this->render('admin/category/new.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * Modifier une catégorie existante
     *
     * @param Category $category
     * @param Request $request
     * @param EntityManagerInterface $manager
     * @return Response
     */
    #[Route('/admin/category/{id}/edit', name: 'admin_category_edit')]
    public function edit(Category $category, Request $request, EntityManagerInterface $manager): Response
    {
        $form = $this->createForm(CategoryType::class, $category);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $manager->flush();

            $this->addFlash('success', 'La catégorie a été modifiée avec succès.');

            return $this->redirectToRoute('admin_category_index');
        }

        return $this->render('admin/category/edit.html.twig', [
            'form' => $form->createView(),
            'category' => $category,
        ]);
    }

    /**
     * Supprimer une catégorie
     *
     * @param Category $category
     * @param EntityManagerInterface $manager
     * @return Response
     */
    #[Route('/admin/category/{id}/delete', name: 'admin_category_delete', methods: ['POST'])]
    public function delete(Category $category, EntityManagerInterface $manager, Request $request): Response
    {
        $manager->remove($category);
        $manager->flush();

        $this->addFlash('success', 'La catégorie a été supprimée avec succès.');

        return $this->redirectToRoute('admin_category_index');
    }
}
