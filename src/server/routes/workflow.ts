import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Workflow } from '../../shared/types.js';
import { executeWorkflow } from '../workflow/executor.js';

export const workflowRouter = express.Router();

// In-memory storage (for MVP)
const workflows = new Map<string, Workflow>();

// Get all workflows
workflowRouter.get('/', (req, res) => {
  const allWorkflows = Array.from(workflows.values());
  res.json(allWorkflows);
});

// Get workflow by ID
workflowRouter.get('/:id', (req, res) => {
  const workflow = workflows.get(req.params.id);
  if (!workflow) {
    return res.status(404).json({ error: 'Workflow not found' });
  }
  res.json(workflow);
});

// Create workflow
workflowRouter.post('/', (req, res) => {
  const workflow: Workflow = {
    id: uuidv4(),
    name: req.body.name || 'Untitled Workflow',
    nodes: req.body.nodes || [],
    edges: req.body.edges || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  workflows.set(workflow.id, workflow);
  res.status(201).json(workflow);
});

// Update workflow
workflowRouter.put('/:id', (req, res) => {
  const existingWorkflow = workflows.get(req.params.id);
  if (!existingWorkflow) {
    return res.status(404).json({ error: 'Workflow not found' });
  }
  
  const updatedWorkflow: Workflow = {
    ...existingWorkflow,
    name: req.body.name || existingWorkflow.name,
    nodes: req.body.nodes || existingWorkflow.nodes,
    edges: req.body.edges || existingWorkflow.edges,
    updatedAt: new Date().toISOString(),
  };
  
  workflows.set(req.params.id, updatedWorkflow);
  res.json(updatedWorkflow);
});

// Delete workflow
workflowRouter.delete('/:id', (req, res) => {
  const deleted = workflows.delete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Workflow not found' });
  }
  res.status(204).send();
});

// Execute workflow
workflowRouter.post('/:id/execute', async (req, res) => {
  const workflow = workflows.get(req.params.id);
  if (!workflow) {
    return res.status(404).json({ error: 'Workflow not found' });
  }
  
  try {
    const result = await executeWorkflow(workflow);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Workflow execution failed' 
    });
  }
});
