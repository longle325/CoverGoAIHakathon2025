"use client";

import { Building2, Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useSearchSpaces } from "@/hooks/use-search-spaces";
import { cn } from "@/lib/utils";

interface WorkspaceSelectorProps {
	selectedWorkspaceIds: number[];
	onWorkspaceSelectionChange: (workspaceIds: number[]) => void;
	currentWorkspaceId?: number;
	multiSelect?: boolean;
}

export const WorkspaceSelector = React.memo(
	({
		selectedWorkspaceIds,
		onWorkspaceSelectionChange,
		currentWorkspaceId,
		multiSelect = true,
	}: WorkspaceSelectorProps) => {
		const { searchSpaces, loading } = useSearchSpaces();
		const [open, setOpen] = useState(false);

		// Debug logging
		useEffect(() => {
			console.log("🔍 WorkspaceSelector Debug:");
			console.log("  - searchSpaces:", searchSpaces);
			console.log("  - loading:", loading);
			console.log("  - selectedWorkspaceIds:", selectedWorkspaceIds);
			console.log("  - currentWorkspaceId:", currentWorkspaceId);
		}, [searchSpaces, loading, selectedWorkspaceIds, currentWorkspaceId]);

		// Initialize with current workspace if provided and nothing selected
		useEffect(() => {
			if (
				currentWorkspaceId &&
				selectedWorkspaceIds.length === 0 &&
				!loading
			) {
				onWorkspaceSelectionChange([currentWorkspaceId]);
			}
		}, [currentWorkspaceId, selectedWorkspaceIds.length, loading, onWorkspaceSelectionChange]);

		const handleToggleWorkspace = (workspaceId: number) => {
			console.log("🖱️ handleToggleWorkspace called:", workspaceId);
			console.log("  - multiSelect:", multiSelect);
			console.log("  - selectedWorkspaceIds:", selectedWorkspaceIds);
			
			if (multiSelect) {
				const isSelected = selectedWorkspaceIds.includes(workspaceId);
				if (isSelected) {
					// Don't allow deselecting if it's the only one selected
					if (selectedWorkspaceIds.length > 1) {
						onWorkspaceSelectionChange(
							selectedWorkspaceIds.filter((id) => id !== workspaceId)
						);
					}
				} else {
					onWorkspaceSelectionChange([...selectedWorkspaceIds, workspaceId]);
				}
			} else {
				onWorkspaceSelectionChange([workspaceId]);
				setOpen(false);
			}
		};

		const selectedWorkspaces = searchSpaces.filter((ws) =>
			selectedWorkspaceIds.includes(ws.id)
		);

		return (
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="justify-between gap-2 h-auto min-h-[40px] py-2"
					>
						<div className="flex items-center gap-2">
							<Building2 className="h-4 w-4 flex-shrink-0" />
							<span className="text-sm">
								{selectedWorkspaces.length === 0
									? "Select workspace(s)"
									: selectedWorkspaces.length === 1
										? selectedWorkspaces[0].name
										: `${selectedWorkspaces.length} workspaces`}
							</span>
						</div>
						{selectedWorkspaces.length > 1 && (
							<Badge variant="secondary" className="ml-auto">
								{selectedWorkspaces.length}
							</Badge>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[400px] p-0" align="start">
					<Command>
						<CommandInput placeholder="Search workspaces..." />
						<CommandList>
							<CommandEmpty>
								{loading ? "Loading workspaces..." : "No workspace found."}
							</CommandEmpty>
							<CommandGroup heading="Available Workspaces">
								{searchSpaces.map((workspace) => {
									const isSelected = selectedWorkspaceIds.includes(workspace.id);
									const isCurrent = workspace.id === currentWorkspaceId;

									return (
										<CommandItem
											key={workspace.id}
											value={workspace.name}
											onSelect={() => handleToggleWorkspace(workspace.id)}
											className="cursor-pointer"
										>
											<div className="flex items-center gap-2 flex-1 min-w-0">
												<div
													className={cn(
														"h-4 w-4 rounded-sm border flex items-center justify-center flex-shrink-0",
														isSelected
															? "bg-primary border-primary"
															: "border-input"
													)}
												>
													{isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
												</div>
												<div className="flex-1 min-w-0">
													<div className="flex items-center gap-2">
														<span className="font-medium truncate">
															{workspace.name}
														</span>
														{isCurrent && (
															<Badge variant="outline" className="text-xs">
																Current
															</Badge>
														)}
													</div>
													{workspace.description && (
														<p className="text-xs text-muted-foreground truncate">
															{workspace.description}
														</p>
													)}
												</div>
											</div>
										</CommandItem>
									);
								})}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		);
	}
);

WorkspaceSelector.displayName = "WorkspaceSelector";
