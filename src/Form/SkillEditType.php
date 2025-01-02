<?php

namespace App\Form;

use App\Entity\Skill;
use App\Form\ApplicationType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ColorType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;

class SkillEditType extends ApplicationType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
        ->add('name',TextType::class,$this->getConfiguration('Nom',"Nom de la compétence"))
        ->add('percentage',IntegerType::class,$this->getConfiguration('Pourcentage',"Pourcentage de maitrise"))
        ->add('color',ColorType::class,$this->getConfiguration('Couleur',"Couleur du langage"))
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Skill::class,
        ]);
    }
}
