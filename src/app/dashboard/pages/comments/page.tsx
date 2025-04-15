"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n/TranslationProvider";
import DashboardLayout from "../../layout/DashboardLayout";
import { 
  ChatBubbleLeftRightIcon, 
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowTopRightOnSquareIcon
} from "@heroicons/react/24/outline";
import { mockPois } from "@/lib/data/mockData";
import { PointOfInterest } from "@/lib/types";
import Link from "next/link";
import { toast } from "react-toastify";

// Simuler des données de commentaires
const mockComments = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  poiId: Math.floor(Math.random() * 10) + 1,
  userId: Math.floor(Math.random() * 5) + 1,
  userName: `User${Math.floor(Math.random() * 5) + 1}`,
  content: `C'est un commentaire sur le point d'intérêt. ${i % 3 === 0 ? 'Très bel endroit, je recommande vivement !' : i % 3 === 1 ? 'J\'ai visité cet endroit le mois dernier, c\'était magnifique.' : 'L\'accès est un peu difficile mais ça vaut le détour.'}`,
  rating: Math.floor(Math.random() * 5) + 1,
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
  status: i % 10 === 0 ? 'pending' : i % 15 === 0 ? 'reported' : 'approved'
}));

interface Comment {
  id: number;
  poiId: number;
  userId: number;
  userName: string;
  content: string;
  rating: number;
  createdAt: string;
  status: 'pending' | 'approved' | 'reported';
}

export default function DashboardCommentsPage() {
  const { t } = useTranslation();
  const [comments, setComments] = useState<Comment[]>([]);
  const [pois, setPois] = useState<PointOfInterest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => {
      setPois(mockPois);
      setComments(mockComments);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Filtrer les commentaires en fonction des critères de recherche
  const filteredComments = comments.filter(comment => {
    const poi = pois.find(p => p.id === comment.poiId);
    if (!poi) return false;
    
    let matchesSearch = true;
    let matchesStatus = true;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      matchesSearch = 
        poi.name.toLowerCase().includes(term) || 
        comment.content.toLowerCase().includes(term) ||
        comment.userName.toLowerCase().includes(term);
    }
    
    if (statusFilter !== "all") {
      matchesStatus = comment.status === statusFilter;
    }
    
    return matchesSearch && matchesStatus;
  });

  const handleApproveComment = (id: number) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, status: 'approved' } : comment
    ));
    toast.success(t("dashboard.comments.approved"));
  };

  const handleReportComment = (id: number) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, status: 'reported' } : comment
    ));
    toast.warning(t("dashboard.comments.reported"));
  };

  const handleDeleteComment = (id: number) => {
    if (window.confirm(t("dashboard.comments.confirmDelete"))) {
      setComments(comments.filter(comment => comment.id !== id));
      toast.success(t("dashboard.comments.deleted"));
    }
  };

  const handleEditComment = (comment: Comment) => {
    setEditingComment(comment);
  };

  const saveEditedComment = () => {
    if (editingComment) {
      setComments(comments.map(comment => 
        comment.id === editingComment.id ? editingComment : comment
      ));
      setEditingComment(null);
      toast.success(t("dashboard.comments.updated"));
    }
  };

  const handleReplySubmit = (commentId: number) => {
    if (replyContent.trim()) {
      // Simuler l'ajout d'une réponse
      const newComment: Comment = {
        id: Math.max(...comments.map(c => c.id)) + 1,
        poiId: comments.find(c => c.id === commentId)?.poiId || 1,
        userId: 1, // Utilisateur courant
        userName: "Admin",
        content: replyContent,
        rating: 0, // Les réponses n'ont pas de note
        createdAt: new Date().toISOString(),
        status: 'approved'
      };
      
      setComments([...comments, newComment]);
      setReplyingTo(null);
      setReplyContent("");
      toast.success(t("dashboard.comments.replyAdded"));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            {t("dashboard.comments.statuses.approved")}
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <ExclamationCircleIcon className="h-3 w-3 mr-1" />
            {t("dashboard.comments.statuses.pending")}
          </span>
        );
      case 'reported':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <ExclamationCircleIcon className="h-3 w-3 mr-1" />
            {t("dashboard.comments.statuses.reported")}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {t("dashboard.comments.title")}
        </h1>
        <p className="text-gray-600">
          {t("dashboard.comments.subtitle")}
        </p>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder={t("dashboard.comments.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">{t("dashboard.comments.allStatuses")}</option>
              <option value="approved">{t("dashboard.comments.statuses.approved")}</option>
              <option value="pending">{t("dashboard.comments.statuses.pending")}</option>
              <option value="reported">{t("dashboard.comments.statuses.reported")}</option>
            </select>
          </div>
          <div className="flex justify-end">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {t("dashboard.comments.totalCount", { count: filteredComments.length })}
            </span>
          </div>
        </div>
      </div>

      {/* Liste des commentaires */}
      <div className="space-y-4">
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        ) : filteredComments.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <ChatBubbleLeftRightIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t("dashboard.comments.noComments")}
            </h3>
            <p className="text-gray-500">
              {t("dashboard.comments.noCommentsDescription")}
            </p>
          </div>
        ) : (
          filteredComments.map(comment => {
            const poi = pois.find(p => p.id === comment.poiId);
            if (!poi) return null;
            
            return (
              <div key={comment.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <Link 
                          href={`/pois/${poi.id}`}
                          className="text-lg font-medium text-blue-600 hover:text-blue-800 mr-2"
                        >
                          {poi.name}
                        </Link>
                        {getStatusBadge(comment.status)}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span className="font-medium text-gray-900 mr-2">{comment.userName}</span>
                        <span>
                          {new Date(comment.createdAt).toLocaleDateString()} {new Date(comment.createdAt).toLocaleTimeString()}
                        </span>
                        {comment.rating > 0 && (
                          <div className="flex items-center ml-3">
                            <span className="text-yellow-400 mr-1">★</span>
                            <span>{comment.rating}</span>
                          </div>
                        )}
                      </div>
                      
                      {editingComment && editingComment.id === comment.id ? (
                        <div className="mb-3">
                          <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            rows={3}
                            value={editingComment.content}
                            onChange={(e) => setEditingComment({
                              ...editingComment,
                              content: e.target.value
                            })}
                          />
                          <div className="flex justify-end mt-2 space-x-2">
                            <button
                              type="button"
                              onClick={() => setEditingComment(null)}
                              className="px-3 py-1 text-sm text-gray-700 hover:text-gray-900"
                            >
                              {t("common.cancel")}
                            </button>
                            <button
                              type="button"
                              onClick={saveEditedComment}
                              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                              {t("common.save")}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-700">{comment.content}</p>
                      )}
                      
                      {replyingTo === comment.id && (
                        <div className="mt-3 pl-4 border-l-2 border-gray-200">
                          <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            rows={3}
                            placeholder={t("dashboard.comments.replyPlaceholder")}
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                          />
                          <div className="flex justify-end mt-2 space-x-2">
                            <button
                              type="button"
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyContent("");
                              }}
                              className="px-3 py-1 text-sm text-gray-700 hover:text-gray-900"
                            >
                              {t("common.cancel")}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleReplySubmit(comment.id)}
                              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                              {t("common.send")}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-1">
                      <button
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                        title={t("dashboard.comments.reply")}
                      >
                        <ChatBubbleLeftRightIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleEditComment(comment)}
                        className="p-2 text-blue-400 hover:text-blue-600"
                        title={t("dashboard.comments.edit")}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="p-2 text-red-400 hover:text-red-600"
                        title={t("dashboard.comments.delete")}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end space-x-2">
                    {comment.status !== 'approved' && (
                      <button
                        onClick={() => handleApproveComment(comment.id)}
                        className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                        {t("dashboard.comments.approve")}
                      </button>
                    )}
                    
                    {comment.status !== 'reported' && (
                      <button
                        onClick={() => handleReportComment(comment.id)}
                        className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
                      >
                        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                        {t("dashboard.comments.report")}
                      </button>
                    )}
                    
                    <Link
                      href={`/pois/${poi.id}`}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
                    >
                      <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1" />
                      {t("dashboard.comments.viewPoi")}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </DashboardLayout>
  );
}
