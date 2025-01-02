<?php

namespace App\Controller;

use App\Entity\Cv;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CvController extends AbstractController
{
    #[Route('/cv/download/{id}', name: 'cv_download', methods: ['POST'])]
    public function download(Cv $cv, EntityManagerInterface $em): JsonResponse
    {
        // Incrémenter le compteur
        $cv->incrementDownloadCount();
        $em->flush();
    
        // Générer le lien de téléchargement
        $filePath = $this->getParameter('uploads_directory') . '/' . $cv->getFilePath();
        $fileName = 'Dylan QUENON-CV.pdf';
        $downloadUrl = $this->generateUrl('cv_file', ['filename' => basename($filePath)]);
    
        return new JsonResponse(['downloadUrl' => $downloadUrl, 'downloadName' => $fileName,]);
    }

    #[Route('/uploads/{filename}', name: 'cv_file', methods: ['GET'])]
public function serveFile(string $filename): BinaryFileResponse
{
    $filePath = $this->getParameter('uploads_directory') . '/' . $filename;
    return $this->file($filePath, $filename, ResponseHeaderBag::DISPOSITION_ATTACHMENT);
}

    
}
