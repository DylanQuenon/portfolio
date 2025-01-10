<?php

namespace App\Repository;

use App\Entity\Skill;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Skill>
 */
class SkillRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Skill::class);
    }

      // Méthode pour récupérer 4 compétences aléatoires
      public function findRandomSkills(int $limit = 4)
      {
          return $this->createQueryBuilder('s')
              ->addSelect('RAND()') // SQL pour récupérer les éléments au hasard
              ->setMaxResults($limit)
              ->getQuery()
              ->getResult();
      }

      public function searchSkillsbyName(string $query): array
      {
          return $this->createQueryBuilder('t')
                      ->andWhere('t.name LIKE :query')
                      ->setParameter('query', '%' . $query . '%')
                      ->getQuery()
                      ->getResult();
      }

    //    /**
    //     * @return Skill[] Returns an array of Skill objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('s')
    //            ->andWhere('s.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('s.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Skill
    //    {
    //        return $this->createQueryBuilder('s')
    //            ->andWhere('s.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
