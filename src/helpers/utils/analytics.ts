import { captureException } from "@sentry/nextjs";

export const logError = (error: Error, info: { componentStack: string }) => {
    captureException(error);
    console.error(error, info.componentStack);
};
