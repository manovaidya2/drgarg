import React from 'react';
import { useParams } from 'react-router-dom';
import BlogEditor from '../components/BlogEditor';
export default function EditBlog() { const { id } = useParams(); return <BlogEditor key={id} postId={id} />; }
