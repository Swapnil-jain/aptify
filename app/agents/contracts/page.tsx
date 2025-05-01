'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
  Loader2, AlertCircle, FileText, Trash2, 
  RefreshCcw, Calendar, ThermometerIcon, Droplets 
} from 'lucide-react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface RiskMetrics {
  temperature: number;
  humidity: number;
  expiry_timeline: number;
}

interface Contract {
  id: string;
  name: string;
  created_at: string;
  expiry_date: string;
  risk_metrics: RiskMetrics;
}

export default function ContractsAgentPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [selectedContract, setSelectedContract] = useState<string | null>(null);

  // Fetch contracts on page load
  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    setLibraryLoading(true);
    try {
      const response = await fetch('/api/contracts');
      const data = await response.json();
      
      if (data.error) {
        console.error('Error fetching contracts:', data.error);
      } else {
        setContracts(data.contracts);
      }
    } catch (error) {
      console.error('Failed to fetch contracts:', error);
    } finally {
      setLibraryLoading(false);
    }
  };

  const handleDeleteContract = async (contractId: string) => {
    if (!confirm('Are you sure you want to delete this contract?')) return;
    
    try {
      const response = await fetch('/api/contracts', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contractId }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Remove the contract from the state
        setContracts(contracts.filter(contract => contract.id !== contractId));
        if (selectedContract === contractId) {
          setSelectedContract(null);
        }
      } else {
        setError('Failed to delete contract');
      }
    } catch (error) {
      setError('Failed to delete contract');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        setFile(null);
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload-contract', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setFile(null);
        setError(null);
        // Refresh the contracts list after successful upload
        fetchContracts();
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (error) {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleContractSelection = (contractId: string) => {
    setSelectedContract(contractId === selectedContract ? null : contractId);
    // Clear previous answers when selecting a new contract
    setAnswer('');
  };

  const handleQuery = async () => {
    if (!query.trim() || !selectedContract) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/contract-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query,
          contractId: selectedContract 
        }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setAnswer(data.answer);
      }
    } catch (error) {
      setError('Failed to get answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto p-4 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">Contract Analysis Assistant</h1>
      
      {/* File Upload Section */}
      <Card className="p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Upload Contract</h2>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="flex-1"
            />
            <Button 
              onClick={handleUpload}
              disabled={!file || uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload'
              )}
            </Button>
          </div>
          {error && (
            <div className="flex items-center gap-2 text-red-500">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </Card>

      {/* Contracts Library */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <Card className="p-4 h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Contracts Library</h2>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchContracts}
                disabled={libraryLoading}
              >
                <RefreshCcw className={`h-4 w-4 mr-2 ${libraryLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>

            {libraryLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : contracts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No contracts found. Upload a PDF to get started.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {contracts.map((contract) => (
                  <div 
                    key={contract.id} 
                    className={`border rounded-lg p-3 flex items-start gap-3 hover:bg-muted/50 transition-colors cursor-pointer ${selectedContract === contract.id ? 'bg-muted border-primary' : ''}`}
                    onClick={() => handleContractSelection(contract.id)}
                  >
                    <div className="p-2 bg-primary/10 rounded-md">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate" title={contract.name}>
                        {contract.name}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Expires: {new Date(contract.expiry_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteContract(contract.id);
                      }}
                      title="Delete contract"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedContract ? (
            <div className="space-y-6">
              {/* Risk Metrics Table */}
              <Card className="p-4">
                <h2 className="text-xl font-semibold mb-4">Risk Metrics</h2>
                {contracts.find(c => c.id === selectedContract)?.risk_metrics ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/3">Temperature</TableHead>
                        <TableHead className="w-1/3">Humidity</TableHead>
                        <TableHead className="w-1/3">Expiry Timeline</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="flex items-center">
                          <ThermometerIcon className="h-4 w-4 mr-2 text-red-500" />
                          {contracts.find(c => c.id === selectedContract)?.risk_metrics.temperature}°C
                        </TableCell>
                        <TableCell className="flex items-center">
                          <Droplets className="h-4 w-4 mr-2 text-blue-500" />
                          {contracts.find(c => c.id === selectedContract)?.risk_metrics.humidity}%
                        </TableCell>
                        <TableCell>
                          <Calendar className="h-4 w-4 mr-2 inline text-green-500" />
                          {contracts.find(c => c.id === selectedContract)?.risk_metrics.expiry_timeline} days
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    <p>No risk metrics available for this contract.</p>
                  </div>
                )}
              </Card>

              {/* Query Section */}
              <Card className="p-4">
                <h2 className="text-xl font-semibold mb-4">Ask about this Contract</h2>
                <div className="flex flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="Type your question here..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleQuery()}
                  />
                  <Button 
                    onClick={handleQuery}
                    disabled={!query.trim() || loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      'Ask'
                    )}
                  </Button>
                </div>

                {/* Answer Display */}
                {answer && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Answer:</h3>
                    <p className="whitespace-pre-wrap">{answer}</p>
                  </div>
                )}
              </Card>
            </div>
          ) : (
            <Card className="p-8 flex flex-col items-center justify-center h-full text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Contract Selected</h3>
              <p className="text-muted-foreground">
                Select a contract from the library to view risk metrics and ask questions.
              </p>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
} 