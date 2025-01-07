<?php 

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;

class StatsService{

    public function __construct(private EntityManagerInterface $manager)
    {}

    /**
     * Permet de récup le nombre d'utilisateur enregistré sur mon site
     *
     * @return integer|null
     */
    public function getProjectsCount(): ?int
    {
        return $this->manager->createQuery("SELECT COUNT(u) FROM App\Entity\Project u")->getSingleScalarResult();
    }

    /**
     * Permet de récup le nombre de compétences
     *
     * @return integer|null
     */
    public function getSkillsCount(): ?int
    {
        return $this->manager->createQuery("SELECT COUNT(a) FROM App\Entity\Skill a")->getSingleScalarResult();
    }





}

