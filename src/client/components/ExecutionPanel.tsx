import { FC } from 'react';
import { WorkflowExecutionResult } from '../../shared/types';
import './ExecutionPanel.css';

interface ExecutionPanelProps {
  result: WorkflowExecutionResult | null;
}

const ExecutionPanel: FC<ExecutionPanelProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="execution-panel">
        <h3 className="execution-panel-title">Execution Results</h3>
        <div className="execution-empty">
          Execute a workflow to see results here
        </div>
      </div>
    );
  }

  return (
    <div className="execution-panel">
      <h3 className="execution-panel-title">
        Execution Results
        <span className={`status ${result.success ? 'success' : 'error'}`}>
          {result.success ? '✓ Success' : '✗ Failed'}
        </span>
      </h3>
      <div className="execution-content">
        {result.error && (
          <div className="error-message">
            <strong>Error:</strong> {result.error}
          </div>
        )}
        {result.results.map((nodeResult, index) => (
          <div key={nodeResult.nodeId} className="node-result">
            <div className="node-result-header">
              <span className="node-result-index">#{index + 1}</span>
              <span className="node-result-id">{nodeResult.nodeId}</span>
              <span
                className={`node-result-status ${nodeResult.success ? 'success' : 'error'}`}
              >
                {nodeResult.success ? '✓' : '✗'}
              </span>
            </div>
            {nodeResult.error ? (
              <div className="node-result-error">{nodeResult.error}</div>
            ) : (
              <pre className="node-result-data">
                {JSON.stringify(nodeResult.data, null, 2)}
              </pre>
            )}
            <div className="node-result-time">
              Executed at: {new Date(nodeResult.executedAt).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExecutionPanel;
