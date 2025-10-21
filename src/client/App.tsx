import { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Toolbar from './components/Toolbar';
import NodePanel from './components/NodePanel';
import ExecutionPanel from './components/ExecutionPanel';
import HttpRequestNode from './components/nodes/HttpRequestNode';
import { Workflow, WorkflowExecutionResult } from '../shared/types';
import './App.css';

const nodeTypes = {
  httpRequest: HttpRequestNode,
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [workflowId, setWorkflowId] = useState<string | null>(null);
  const [workflowName, setWorkflowName] = useState('My Workflow');
  const [executionResult, setExecutionResult] = useState<WorkflowExecutionResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onAddNode = useCallback(
    (type: string) => {
      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        data: {
          label: type === 'httpRequest' ? 'HTTP Request' : 'Unknown',
          config: type === 'httpRequest' ? { method: 'GET', url: '' } : {},
        },
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );

  const saveWorkflow = async () => {
    const workflow = {
      name: workflowName,
      nodes: nodes.map(n => ({
        id: n.id,
        type: n.type || 'default',
        position: n.position,
        data: n.data,
      })),
      edges: edges.map(e => ({
        id: e.id,
        source: e.source,
        target: e.target,
      })),
    };

    try {
      const response = workflowId
        ? await fetch(`/api/workflows/${workflowId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(workflow),
          })
        : await fetch('/api/workflows', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(workflow),
          });

      const data: Workflow = await response.json();
      setWorkflowId(data.id);
      alert('Workflow saved successfully!');
    } catch (error) {
      console.error('Failed to save workflow:', error);
      alert('Failed to save workflow');
    }
  };

  const executeWorkflow = async () => {
    if (!workflowId) {
      alert('Please save the workflow first');
      return;
    }

    setIsExecuting(true);
    setExecutionResult(null);

    try {
      const response = await fetch(`/api/workflows/${workflowId}/execute`, {
        method: 'POST',
      });
      const result: WorkflowExecutionResult = await response.json();
      setExecutionResult(result);
    } catch (error) {
      console.error('Failed to execute workflow:', error);
      setExecutionResult({
        success: false,
        results: [],
        error: 'Failed to execute workflow',
      });
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="app">
      <Toolbar
        workflowName={workflowName}
        onWorkflowNameChange={setWorkflowName}
        onSave={saveWorkflow}
        onExecute={executeWorkflow}
        isExecuting={isExecuting}
      />
      <div className="workspace">
        <NodePanel onAddNode={onAddNode} />
        <div className="canvas">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background />
          </ReactFlow>
        </div>
        <ExecutionPanel result={executionResult} />
      </div>
    </div>
  );
}

export default App;
