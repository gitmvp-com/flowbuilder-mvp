import axios from 'axios';
import { 
  Workflow, 
  WorkflowExecutionResult, 
  NodeExecutionResult,
  HttpRequestConfig 
} from '../../shared/types.js';

export async function executeWorkflow(workflow: Workflow): Promise<WorkflowExecutionResult> {
  const results: NodeExecutionResult[] = [];
  
  try {
    // Build execution order (topological sort)
    const executionOrder = getExecutionOrder(workflow);
    
    // Execute nodes in order
    for (const nodeId of executionOrder) {
      const node = workflow.nodes.find(n => n.id === nodeId);
      if (!node) continue;
      
      const result = await executeNode(node);
      results.push(result);
      
      // Stop execution if node failed
      if (!result.success) {
        return {
          success: false,
          results,
          error: `Node ${node.data.label} failed: ${result.error}`,
        };
      }
    }
    
    return {
      success: true,
      results,
    };
  } catch (error: any) {
    return {
      success: false,
      results,
      error: error.message || 'Unknown error during workflow execution',
    };
  }
}

function getExecutionOrder(workflow: Workflow): string[] {
  // Simple implementation: execute nodes in order they appear
  // In a full implementation, this would do topological sorting
  return workflow.nodes.map(n => n.id);
}

async function executeNode(node: any): Promise<NodeExecutionResult> {
  const executedAt = new Date().toISOString();
  
  try {
    let data: any;
    
    switch (node.type) {
      case 'httpRequest':
        data = await executeHttpRequest(node.data.config);
        break;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
    
    return {
      nodeId: node.id,
      success: true,
      data,
      executedAt,
    };
  } catch (error: any) {
    return {
      nodeId: node.id,
      success: false,
      error: error.message || 'Node execution failed',
      executedAt,
    };
  }
}

async function executeHttpRequest(config: HttpRequestConfig): Promise<any> {
  const response = await axios({
    method: config.method,
    url: config.url,
    headers: config.headers,
    data: config.body,
  });
  
  return {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    data: response.data,
  };
}
