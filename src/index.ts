import { randomUUID } from 'node:crypto';
import type { Context } from '@deepseek-ai/cordis';
import type {} from '@deepseek-ai/dsh-storage-domain';
import type {} from '@deepseek-ai/dsh-client-connection';
import type {} from '@deepseek-ai/dsh-tools';
import { LibraryManager, type LibraryManagerOptions } from './services/library-manager.js';
import { registerLibraryConnection } from './remote/connection-api.js';
import { registerLibraryTools } from './tools/library-tools.js';
import { registerLibraryContextInjection } from './runtime/context-injection.js';

export * from './services/library-manager.js';
export * from './services/converters.js';
export * from './storage/domain.js';
export * from './runtime/context-injection.js';
export * from './remote/connection-api.js';
export * from './tools/library-tools.js';

export const name = 'dsh-library-master';
export const inject = ['storageDomain', 'connection', 'tools', 'systemPrompt'];

export async function apply(ctx: Context, options: LibraryManagerOptions = {}): Promise<void> {
  ctx.provide('dshLibraryIdentity', { async resolve(input, signal) { signal?.throwIfAborted(); return { principalId: 'local-owner', organizationId: 'local-personal', requestId: randomUUID(), resolvedBy: 'dsh-library-master/local', ...(input?.sessionId ? {sessionId: input.sessionId} : {}), ...(input?.runId ? {runId: input.runId} : {}) }; } });
  await ctx.plugin(LibraryManager, options);
  await ctx.plugin({ name: 'dsh-library-master-integration', inject: [...inject, 'dshLibrary'], apply(integration: Context) { registerLibraryConnection(integration); registerLibraryTools(integration); registerLibraryContextInjection(integration); } });
}

export { extractTabularText } from './services/tabular/tabular.js';
