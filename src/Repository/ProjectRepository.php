<?php

namespace App\Repository;

use App\Entity\Project;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @extends ServiceEntityRepository<Project>
 */
class ProjectRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Project::class);
    }

    public function findByTitle(string $term): QueryBuilder
    {
        return $this->createQueryBuilder('a')
            ->where('a.title LIKE :term')
            ->setParameter('term', '%' . $term . '%');
    }

    public function findSkillsForCategoryDesign()
    {
        $qb = $this->createQueryBuilder('p')
            ->innerJoin('p.languages', 's') // Jointure avec les compétences/langues
            ->innerJoin('p.category', 'c') // Jointure avec les catégories
            ->where('c.name LIKE :category OR c.nameEn LIKE :category') // Condition sur la catégorie
            ->setParameter('category', '%Design%') // Filtrer sur "Design"
            ->select('DISTINCT s.id, s.name') // Sélectionner les champs nécessaires de l'entité Skill
            ->getQuery();
    
        return $qb->getArrayResult(); // Retourne un tableau avec les résultats
    }
    
    
    

    //    /**
    //     * @return Project[] Returns an array of Project objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('p')
    //            ->andWhere('p.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('p.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Project
    //    {
    //        return $this->createQueryBuilder('p')
    //            ->andWhere('p.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
