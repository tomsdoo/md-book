import { fetchPageContent, PageContent } from "./fetchPageContent";

export interface FetchPageContentOptions {
  loading?: {
    maxNumberOfFilesAtOnce?: number;
  };
  verbose?: boolean;
}

async function fetchBatch(
  pathObjects: Array<{ path: string; indexed: boolean }>
): Promise<PageContent[]> {
  return await Promise.all(pathObjects.map(fetchPageContent));
}

export async function fetchPageContents(
  pathObjects: Array<{ path: string; indexed: boolean }>,
  options?: FetchPageContentOptions
): Promise<PageContent[]> {
  const batches = [];
  const UNIT_PER_BATCH = options?.loading?.maxNumberOfFilesAtOnce ?? 5;
  const batchLength =
    Math.floor(pathObjects.length / UNIT_PER_BATCH) +
    (pathObjects.length % UNIT_PER_BATCH > 0 ? 1 : 0);
  for (let i = 0; i < batchLength; i++) {
    batches.push(
      await fetchBatch(
        pathObjects.slice(
          i * UNIT_PER_BATCH,
          i * UNIT_PER_BATCH + UNIT_PER_BATCH
        )
      )
    );
  }
  if (options?.verbose as boolean) {
    console.log(`loaded contents with ${batches.length} batches`);
  }
  return batches.flat();
}