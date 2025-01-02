<?php
namespace App\Entity;

use Symfony\Component\Validator\Constraints as Assert;

class FileModify
{
    #[Assert\NotBlank(message:"Veuillez ajouter un image")]
    #[Assert\File(mimeTypes:['application/pdf'], mimeTypesMessage:"Vous devez uploader un fichier PDF")]    #[Assert\File(maxSize:"2048k", maxSizeMessage: "La taille du fichier est trop grande")]
    private $newFile;

    public function getNewFile(): ?string
    {
        return $this->newFile;
    }

    public function setNewFile(?string $newFile): self
    {
        $this->newFile = $newFile;

        return $this;
    }
}

?>