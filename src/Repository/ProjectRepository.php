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

    /**
     * Trouver les projets par titre
     *
     * @param string $term
     * @return QueryBuilder
     */
    public function findByTitle(string $term): QueryBuilder
    {
        return $this->createQueryBuilder('a')
            ->where('a.title LIKE :term')
            ->setParameter('term', '%' . $term . '%');
    }

    /**
     * Trouver les skills par categories de design
     *
     * @return void
     */
    public function findSkillsForCategoryDesign()
    {
        $qb = $this->createQueryBuilder('p')
            ->innerJoin('p.languages', 's') 
            ->innerJoin('p.category', 'c') 
            ->where('c.name LIKE :category OR c.nameEn LIKE :category') 
            ->setParameter('category', '%Design%') 
            ->select('DISTINCT s.id, s.name')
            ->getQuery();
    
        return $qb->getArrayResult();
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

    /**
     * Chercher un projet par son titre
     *
     * @param string $query
     * @return array
     */
    public function searchProjectbyTitle(string $query): array
    {
        return $this->createQueryBuilder('t')
                    ->andWhere('t.title LIKE :query')
                    ->setParameter('query', '%' . $query . '%')
                    ->getQuery()
                    ->getResult();
    }
}
