// Test the deployed backend
const axios = require('axios');

async function testDeployment() {
    try {
        console.log('🧪 Testing Deployed Backend...\n');
        
        const API_URL = 'https://task-manager-app-w0ax.onrender.com/api';
        
        // Test 1: Health Check
        console.log('1. Testing health endpoint...');
        const healthResponse = await axios.get('https://task-manager-app-w0ax.onrender.com/health');
        console.log('✅ Health Status:', healthResponse.data);
        
        // Test 2: Get Tasks
        console.log('\n2. Testing GET tasks...');
        const getResponse = await axios.get(`${API_URL}/tasks`);
        console.log('✅ GET Tasks Status:', getResponse.status);
        console.log('📊 Current tasks:', getResponse.data.length);
        
        // Test 3: Create Task
        console.log('\n3. Testing POST task...');
        const newTask = {
            title: 'DEPLOYMENT TEST TASK',
            description: 'Testing deployed backend',
            due_date: '2026-12-31',
            status: 'Pending',
            remarks: 'Deployment test'
        };
        
        const postResponse = await axios.post(`${API_URL}/tasks`, newTask, {
            headers: {
                'x-user-name': 'TestUser',
                'x-user-id': 'test_123'
            }
        });
        console.log('✅ POST Status:', postResponse.status);
        console.log('📝 Response:', postResponse.data);
        
        // Test 4: Verify Task Created
        console.log('\n4. Verifying task creation...');
        const verifyResponse = await axios.get(`${API_URL}/tasks`);
        const testTask = verifyResponse.data.find(t => t.title === 'DEPLOYMENT TEST TASK');
        
        if (testTask) {
            console.log('✅ Task created successfully!');
            console.log('📋 Task ID:', testTask.id);
            console.log('👤 Created By:', testTask.created_by);
            console.log('🕐 Created On:', testTask.created_on);
        } else {
            console.log('❌ Task not found after creation');
        }
        
        console.log('\n🎉 All tests completed!');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.response) {
            console.error('📊 Status:', error.response.status);
            console.error('📄 Data:', error.response.data);
        }
    }
}

testDeployment();
