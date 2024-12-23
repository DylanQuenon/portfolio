<?php

namespace App\DataFixtures;

use App\Entity\Admin;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    public function __construct(private UserPasswordHasherInterface $passwordHasher)
    {}
    public function load(ObjectManager $manager): void
    {
          // Créer l'utilisateur admin
          $adminUser = new Admin();
          $adminUser->setEmail('dylan@gmail.com')
                    ->setPassword($this->passwordHasher->hashPassword($adminUser, 'password'))
                    ->setRoles(['ROLE_ADMIN']);
          $manager->persist($adminUser);

        $manager->flush();
    }
}
