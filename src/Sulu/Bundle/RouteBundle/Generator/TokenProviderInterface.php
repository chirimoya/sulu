<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\RouteBundle\Generator;

/**
 * Token-provider resolves a token for given entity.
 */
interface TokenProviderInterface
{
    /**
     * Returns resolved token for entity.
     *
     * @param object|mixed[] $entity
     * @param string $name
     *
     * @return string
     *
     * @throws CannotEvaluateTokenException
     */
    public function provide($entity, $name/*, array $options = [] */);
}
