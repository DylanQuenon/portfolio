<?php

namespace App\Controller;

use App\Entity\Contact;
use App\Form\ContactType;
use Symfony\Component\Mime\Email;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\Translation\TranslatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class ContactController extends AbstractController
{
    /**
     * Contact
     *
     * @param Request $request
     * @param EntityManagerInterface $manager
     * @param MailerInterface $mailer
     * @param TranslatorInterface $translator
     * @return Response
     */
    #[Route('/contact', name: 'contact')]
    public function index(Request $request, EntityManagerInterface $manager, MailerInterface $mailer,TranslatorInterface $translator): Response
    {
        $contact = new Contact();
        $form = $this->createForm(ContactType::class, $contact);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $manager->persist($contact);
            $manager->flush();

            $email = (new Email())
                ->from('contact@dylanquenon.com')
                ->to('dylan.quenon.04@gmail.com')  
                ->replyTo($contact->getMail())
                ->subject("Nouveau message de" . $contact->getLastName())
                ->html($this->renderView('mail/contactNotif.html.twig', [
                    'contact' => $contact,
                ]));

               
            // Envoi de l'e-mail
            $mailer->send($email);

            $this->addFlash('success', $translator->trans('flash.success'));
            return $this->redirectToRoute('contact');
        }

        return $this->render('contact/index.html.twig', [
            'form' => $form->createView()
        ]);
    }
}
