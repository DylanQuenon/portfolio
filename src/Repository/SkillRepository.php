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

      /**
       * Récupérer les compétences au hasard
       *
       * @param integer $limit
       * @return void
       */
      public function findRandomSkills(int $limit = 4)
      {
          return $this->createQueryBuilder('s')
              ->addSelect('RAND()')
              ->setMaxResults($limit)
              ->getQuery()
              ->getResult();
      }

      /**
       * Trouver les compétences par nom
       *
       * @param string $query
       * @return array
       */
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
