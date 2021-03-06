<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\MediaBundle\Media\ImageConverter\Cropper;

use Imagine\Image\Box;
use Imagine\Image\ImageInterface;
use Imagine\Image\Point;

/**
 * The class represents a cropper of an image, according to the interface it implements.
 */
class Cropper implements CropperInterface
{
    public function crop(ImageInterface $image, $x, $y, $width, $height)
    {
        $point = new Point($x, $y);
        $box = new Box($width, $height);

        $image->crop($point, $box);

        return $image;
    }

    public function isValid(ImageInterface $image, $x, $y, $width, $height, array $format)
    {
        $isInsideImage = $this->isInsideImage($image, $x, $y, $width, $height);
        $isNotSmallerThanFormat = $this->isNotSmallerThanFormat($width, $height, $format);
        $isMaxSizeForImage = $this->isMaxSizeForImage($image, $width, $height);

        return $isInsideImage && ($isNotSmallerThanFormat || $isMaxSizeForImage);
    }

    /**
     * Returns true iff the cropping does not exceed the image borders.
     *
     * @param int $x
     * @param int $y
     * @param int $width
     * @param int $height
     *
     * @return bool
     */
    private function isInsideImage(ImageInterface $image, $x, $y, $width, $height)
    {
        if ($x < 0 || $y < 0) {
            return false;
        }
        if ($x + $width > $image->getSize()->getWidth()) {
            return false;
        }
        if ($y + $height > $image->getSize()->getHeight()) {
            return false;
        }

        return true;
    }

    /**
     * Returns true iff the crop is greater or equal to the size of a given format.
     *
     * @param int $width
     * @param int $height
     *
     * @return bool
     */
    private function isNotSmallerThanFormat($width, $height, array $format)
    {
        if (isset($format['scale']['x']) && $width < $format['scale']['x']) {
            return false;
        }
        if (isset($format['scale']['y']) && $height < $format['scale']['y']) {
            return false;
        }

        return true;
    }

    private function isMaxSizeForImage(ImageInterface $image, $width, $height)
    {
        if ($width === $image->getSize()->getWidth()) {
            return true;
        }
        if ($height === $image->getSize()->getHeight()) {
            return true;
        }

        return false;
    }
}
