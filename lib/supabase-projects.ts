/**
 * Helper functions for working with projects in Supabase
 * These functions demonstrate how to use Supabase with the Open Lovable project structure
 */

import { supabase } from './supabase';

// ============================================
// Types
// ============================================

export interface Project {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  sandbox_id: string | null;
  preview_url: string | null;
  status: 'active' | 'archived' | 'deleted';
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ProjectFile {
  id: string;
  project_id: string;
  file_path: string;
  content: string | null;
  file_type: string | null;
  size_bytes: number | null;
  created_at: string;
  updated_at: string;
}

export interface GenerationHistory {
  id: string;
  project_id: string;
  user_id: string;
  prompt: string;
  model: string | null;
  generated_files: any[];
  status: 'pending' | 'completed' | 'failed';
  error_message: string | null;
  metadata: Record<string, any>;
  created_at: string;
}

// ============================================
// Project Functions
// ============================================

/**
 * Create a new project
 */
export async function createProject(data: {
  name: string;
  description?: string;
  sandbox_id?: string;
  preview_url?: string;
  metadata?: Record<string, any>;
}) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to create a project');
  }

  const { data: project, error } = await supabase
    .from('projects')
    .insert({
      user_id: user.id,
      name: data.name,
      description: data.description || null,
      sandbox_id: data.sandbox_id || null,
      preview_url: data.preview_url || null,
      metadata: data.metadata || {},
      status: 'active'
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating project:', error);
    throw error;
  }

  return project as Project;
}

/**
 * Get all projects for the current user
 */
export async function getUserProjects(options?: {
  status?: 'active' | 'archived' | 'deleted';
  limit?: number;
  orderBy?: 'created_at' | 'updated_at' | 'name';
}) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated');
  }

  let query = supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id);

  if (options?.status) {
    query = query.eq('status', options.status);
  }

  if (options?.orderBy) {
    query = query.order(options.orderBy, { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }

  return data as Project[];
}

/**
 * Get a single project by ID
 */
export async function getProject(projectId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single();

  if (error) {
    console.error('Error fetching project:', error);
    throw error;
  }

  return data as Project;
}

/**
 * Update a project
 */
export async function updateProject(
  projectId: string,
  updates: Partial<Omit<Project, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
) {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', projectId)
    .select()
    .single();

  if (error) {
    console.error('Error updating project:', error);
    throw error;
  }

  return data as Project;
}

/**
 * Delete a project (soft delete by setting status to 'deleted')
 */
export async function deleteProject(projectId: string, hard: boolean = false) {
  if (hard) {
    // Hard delete - permanently remove from database
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  } else {
    // Soft delete - just mark as deleted
    await updateProject(projectId, { status: 'deleted' });
  }
}

/**
 * Archive a project
 */
export async function archiveProject(projectId: string) {
  return updateProject(projectId, { status: 'archived' });
}

/**
 * Restore an archived or deleted project
 */
export async function restoreProject(projectId: string) {
  return updateProject(projectId, { status: 'active' });
}

// ============================================
// Project Files Functions
// ============================================

/**
 * Save files to a project
 */
export async function saveProjectFiles(
  projectId: string,
  files: Array<{ path: string; content: string; type?: string }>
) {
  const filesToInsert = files.map(file => ({
    project_id: projectId,
    file_path: file.path,
    content: file.content,
    file_type: file.type || getFileType(file.path),
    size_bytes: new Blob([file.content]).size
  }));

  const { data, error } = await supabase
    .from('project_files')
    .upsert(filesToInsert, {
      onConflict: 'project_id,file_path'
    })
    .select();

  if (error) {
    console.error('Error saving project files:', error);
    throw error;
  }

  return data as ProjectFile[];
}

/**
 * Get all files for a project
 */
export async function getProjectFiles(projectId: string) {
  const { data, error } = await supabase
    .from('project_files')
    .select('*')
    .eq('project_id', projectId)
    .order('file_path');

  if (error) {
    console.error('Error fetching project files:', error);
    throw error;
  }

  return data as ProjectFile[];
}

/**
 * Get a single file from a project
 */
export async function getProjectFile(projectId: string, filePath: string) {
  const { data, error } = await supabase
    .from('project_files')
    .select('*')
    .eq('project_id', projectId)
    .eq('file_path', filePath)
    .single();

  if (error) {
    console.error('Error fetching project file:', error);
    throw error;
  }

  return data as ProjectFile;
}

/**
 * Delete a file from a project
 */
export async function deleteProjectFile(projectId: string, filePath: string) {
  const { error } = await supabase
    .from('project_files')
    .delete()
    .eq('project_id', projectId)
    .eq('file_path', filePath);

  if (error) {
    console.error('Error deleting project file:', error);
    throw error;
  }
}

// ============================================
// Generation History Functions
// ============================================

/**
 * Record a code generation request
 */
export async function recordGeneration(data: {
  project_id: string;
  prompt: string;
  model?: string;
  generated_files?: any[];
  status?: 'pending' | 'completed' | 'failed';
  error_message?: string;
  metadata?: Record<string, any>;
}) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated');
  }

  const { data: history, error } = await supabase
    .from('generation_history')
    .insert({
      project_id: data.project_id,
      user_id: user.id,
      prompt: data.prompt,
      model: data.model || null,
      generated_files: data.generated_files || [],
      status: data.status || 'pending',
      error_message: data.error_message || null,
      metadata: data.metadata || {}
    })
    .select()
    .single();

  if (error) {
    console.error('Error recording generation:', error);
    throw error;
  }

  return history as GenerationHistory;
}

/**
 * Update generation status
 */
export async function updateGenerationStatus(
  generationId: string,
  status: 'pending' | 'completed' | 'failed',
  options?: {
    generated_files?: any[];
    error_message?: string;
  }
) {
  const updates: any = { status };
  
  if (options?.generated_files) {
    updates.generated_files = options.generated_files;
  }
  
  if (options?.error_message) {
    updates.error_message = options.error_message;
  }

  const { data, error } = await supabase
    .from('generation_history')
    .update(updates)
    .eq('id', generationId)
    .select()
    .single();

  if (error) {
    console.error('Error updating generation status:', error);
    throw error;
  }

  return data as GenerationHistory;
}

/**
 * Get generation history for a project
 */
export async function getProjectGenerationHistory(
  projectId: string,
  limit: number = 10
) {
  const { data, error } = await supabase
    .from('generation_history')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching generation history:', error);
    throw error;
  }

  return data as GenerationHistory[];
}

// ============================================
// Helper Functions
// ============================================

/**
 * Get file type from file path
 */
function getFileType(filePath: string): string {
  const ext = filePath.split('.').pop()?.toLowerCase();
  
  const typeMap: Record<string, string> = {
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'css': 'css',
    'scss': 'scss',
    'html': 'html',
    'json': 'json',
    'md': 'markdown',
    'txt': 'text'
  };
  
  return typeMap[ext || ''] || 'unknown';
}
