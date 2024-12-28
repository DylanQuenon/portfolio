<?php

namespace App\Form;

use App\Entity\Skill;
use App\Entity\Project;
use App\Entity\Category;
use App\Form\ApplicationType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class ProjectEditType extends ApplicationType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title',TextType::class,$this->getConfiguration('Titre',"Titre du projet"))
            ->add('date', DateType::class, [
                'widget' => 'single_text',
                'attr' => [
                    'placeholder' => "Ex: 25/08/2024",
                ],
                'label'=>"Date du projet",
            ])
            ->add('intro',TextType::class,$this->getConfiguration('Introduction FR',"Intro du projet en français"))
            ->add('introEn',TextType::class,$this->getConfiguration('Introduction anglais',"Intro du projet en anglais"))
            ->add('descriptionFr',TextareaType::class,$this->getConfiguration('Description FR',"Description du projet en français"))
            ->add('descriptionEn',TextareaType::class,$this->getConfiguration('Description anglais',"Description du projet en anglais"))
            ->add('website', UrlType::class, [
                'label' => "URL du site",
                'attr' => [
                    'placeholder' => "Entrez l'URL du site ici",
                ],
                'required' => false,
            ]) 
            ->add('figma', UrlType::class, [
                'label' => "URL du figma",
                'attr' => [
                    'placeholder' => "Entrez l'URL du figma ici",
                ],
                'required' => false,
            ])
            ->add('github', UrlType::class, [
                'label' => "URL du github",
                'required' => false,
                'attr' => [
                    'placeholder' => "Entrez l'URL du github ici",
                ],
            ])
            ->add('languages', EntityType::class, [
                'class' => Skill::class,
                'choice_label' => 'name',
                'multiple' => true,
                'expanded' => false,
                'label' => 'Skills',
                'attr' => ['class' => 'choices-multiple mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50']
            ])
            ->add('category', EntityType::class, [
                'class' => Category::class,
                'choice_label' => 'name',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Project::class,
        ]);
    }
}
