import './styles.css';
import QuizComponent from './routes/components/QuizComponent.svelte';

const app = new QuizComponent({
  target: document.body, // 将内容挂载到 body 上
});

export default app;