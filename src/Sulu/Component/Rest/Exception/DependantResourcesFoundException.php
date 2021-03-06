<?php

declare(strict_types=1);

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Component\Rest\Exception;

class DependantResourcesFoundException extends \Exception implements DependantResourcesFoundExceptionInterface
{
    /**
     * @var array<int, array<array{id: int|string, resourceKey: string}>>
     */
    private $dependantResources;

    /**
     * @var int
     */
    private $dependantResourcesCount;

    /**
     * @param array<int, array<array{id: int|string, resourceKey: string}>> $dependantResources
     */
    public function __construct(array $dependantResources, int $dependantResourcesCount)
    {
        $this->dependantResources = $dependantResources;
        $this->dependantResourcesCount = $dependantResourcesCount;

        parent::__construct(
            \sprintf('Resource has %d dependant resources.', $this->dependantResourcesCount),
            static::EXCEPTION_CODE_DEPENDANT_RESOURCES_FOUND
        );
    }

    public function getDependantResources(): array
    {
        return $this->dependantResources;
    }

    public function getDependantResourcesCount(): int
    {
        return $this->dependantResourcesCount;
    }
}
