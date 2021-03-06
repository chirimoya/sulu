<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\PreviewBundle\Preview;

use Sulu\Bundle\PreviewBundle\Preview\Exception\ProviderNotFoundException;

/**
 * Interface for preview.
 */
interface PreviewInterface
{
    /**
     * Starts a new preview session.
     *
     * @return string Token can be used to reuse this preview-session
     *
     * @throws ProviderNotFoundException
     */
    public function start(string $providerKey, string $id, int $userId, array $data = [], array $options = []): string;

    /**
     * Stops the preview-session and deletes the data.
     */
    public function stop(string $token): void;

    /**
     * Returns true if such a session exists.
     */
    public function exists(string $token): bool;

    /**
     * Updates given data in the preview-session.
     *
     * @return string Complete html response
     */
    public function update(
        string $token,
        array $data,
        array $options = []
    ): string;

    /**
     * Updates given context and restart preview with given data.
     *
     * @param mixed[] $context
     * @param mixed[] $data
     * @param mixed[] $options
     *
     * @return string Complete html response
     */
    public function updateContext(
        string $token,
        array $context,
        array $data,
        array $options = []
    ): string;

    /**
     * Returns rendered preview-session.
     *
     * @return string Complete html response
     */
    public function render(
        string $token,
        array $options = []
    ): string;
}
