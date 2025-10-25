"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import type { Document } from "./use-documents";

interface Connector {
	id: number;
	name: string;
	connector_type: string;
	search_space_id: number;
}

interface DocumentWithWorkspace extends Document {
	workspace_name?: string;
}

interface ConnectorWithWorkspace extends Connector {
	workspace_name?: string;
}

export function useCrossWorkspaceResources() {
	const [documents, setDocuments] = useState<DocumentWithWorkspace[]>([]);
	const [connectors, setConnectors] = useState<ConnectorWithWorkspace[]>([]);
	const [loadingDocuments, setLoadingDocuments] = useState(false);
	const [loadingConnectors, setLoadingConnectors] = useState(false);

	const fetchDocumentsFromWorkspaces = useCallback(
		async (workspaceIds: number[], workspaceNames: Map<number, string>) => {
			if (workspaceIds.length === 0) {
				setDocuments([]);
				return;
			}

			setLoadingDocuments(true);
			try {
				const token = localStorage.getItem("surfsense_bearer_token");
				if (!token) {
					toast.error("Authentication error. Please log in again.");
					return;
				}

				// Fetch documents from all selected workspaces in parallel
				const documentPromises = workspaceIds.map(async (workspaceId) => {
					const params = new URLSearchParams({
						search_space_id: workspaceId.toString(),
						page_size: "100",
					});

					const response = await fetch(
						`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/api/v1/documents?${params.toString()}`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
							method: "GET",
						}
					);

					if (response.ok) {
						const data = await response.json();
						const docs = Array.isArray(data) ? data : data.items || [];
						// Add workspace name to each document
						return docs.map((doc: Document) => ({
							...doc,
							workspace_name: workspaceNames.get(workspaceId) || `Workspace ${workspaceId}`,
						}));
					}
					return [];
				});

				const allDocuments = await Promise.all(documentPromises);
				const flattenedDocuments = allDocuments.flat();
				setDocuments(flattenedDocuments);
			} catch (error) {
				console.error("Error fetching documents:", error);
				toast.error("Failed to fetch documents from workspaces");
			} finally {
				setLoadingDocuments(false);
			}
		},
		[]
	);

	const fetchConnectorsFromWorkspaces = useCallback(
		async (workspaceIds: number[], workspaceNames: Map<number, string>) => {
			if (workspaceIds.length === 0) {
				setConnectors([]);
				return;
			}

			setLoadingConnectors(true);
			try {
				const token = localStorage.getItem("surfsense_bearer_token");
				if (!token) {
					toast.error("Authentication error. Please log in again.");
					return;
				}

				// Fetch connectors from all selected workspaces in parallel
				const connectorPromises = workspaceIds.map(async (workspaceId) => {
					const params = new URLSearchParams({
						search_space_id: workspaceId.toString(),
					});

					const response = await fetch(
						`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/api/v1/search-source-connectors/?${params.toString()}`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
							method: "GET",
						}
					);

					if (response.ok) {
						const data = await response.json();
						// Add workspace name to each connector
						return data.map((connector: Connector) => ({
							...connector,
							workspace_name: workspaceNames.get(workspaceId) || `Workspace ${workspaceId}`,
						}));
					}
					return [];
				});

				const allConnectors = await Promise.all(connectorPromises);
				const flattenedConnectors = allConnectors.flat();
				setConnectors(flattenedConnectors);
			} catch (error) {
				console.error("Error fetching connectors:", error);
				toast.error("Failed to fetch connectors from workspaces");
			} finally {
				setLoadingConnectors(false);
			}
		},
		[]
	);

	return {
		documents,
		connectors,
		loadingDocuments,
		loadingConnectors,
		fetchDocumentsFromWorkspaces,
		fetchConnectorsFromWorkspaces,
	};
}
