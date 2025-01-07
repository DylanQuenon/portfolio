<?php

// src/Form/ContactType.php
namespace App\Form;

use App\Entity\Contact;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Contracts\Translation\TranslatorInterface;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class ContactType extends AbstractType
{
    private TranslatorInterface $translator;

    public function __construct(TranslatorInterface $translator)
    {
        $this->translator = $translator;
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('firstName', TextType::class, [
                'label' => false, // Pas de label
                'attr' => [
                    'placeholder' => $this->translator->trans('form.first_name.placeholder')
                ]
            ])
            ->add('lastName', TextType::class, [
                'label' => false, // Pas de label
                'attr' => [
                    'placeholder' => $this->translator->trans('form.last_name.placeholder')
                ]
            ])
            ->add('mail', EmailType::class, [
                'label' => false, // Pas de label
                'attr' => [
                    'placeholder' => $this->translator->trans('form.mail.placeholder')
                ]
            ])
            ->add('message', TextareaType::class, [
                'label' => false, // Pas de label
                'attr' => [
                    'placeholder' => $this->translator->trans('form.message.placeholder')
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Contact::class,
        ]);
    }
}
