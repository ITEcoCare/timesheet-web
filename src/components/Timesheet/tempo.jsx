import { Button, Form, Input, Select, Space } from 'antd';
import { useStore } from "../../store/zustand";
import { useState, useEffect } from 'react';
import {
    FaTag,
    FaPen,
    FaTrash,
    FaCheck,
    FaTimes,
    FaGripHorizontal,
} from "react-icons/fa";

const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
    


const App = () => {
    const [cities, setCities] = useState(cityData[provinceData[0]]);
    const [secondCity, setSecondCity] = useState(cityData[provinceData[0]][0]);
    
    
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [listPJ, setListPJ] = useState([]);
    const [listTags, setListTags] = useState([]);
    // const [selectedLabel, setSelectedLabel] = useState(labelsClasses[0]);
    
    const accessToken = localStorage.getItem("accessToken");
    
    //zustand
    const showEventModal = useStore((state) => state.showEventModal);
    const setShowEventModal = useStore((state) => state.setShowEventModal);
    const daySelected = useStore((state) => state.daySelected);
    // const createProject = useStore((state) => state.createProject);
    const createTimesheet = useStore((state) => state.createTimesheet);
    const getProjectByUser = useStore((state) => state.getProjectByUser);
    const getTags = useStore((state) => state.getTags);
    
    const [form] = Form.useForm();
    const onGenderChange = (value) => {
      switch (value) {
        case 'male':
          form.setFieldsValue({
            note: 'Hi, man!',
          });
          break;
        case 'female':
          form.setFieldsValue({
            note: 'Hi, lady!',
          });
          break;
        case 'other':
          form.setFieldsValue({
            note: 'Hi there!',
          });
          break;
        default:
      }
    };
    const onFinish = (values) => {
      console.log("values >>>", values);
    };
    const onReset = () => {
      form.resetFields();
    };
    const onFill = () => {
      form.setFieldsValue({
        note: 'Hello world!',
        gender: 'male',
      });
    };
    
  const handleProvinceChange = (value) => {
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
  };
  const onSecondCityChange = (value) => {
    setSecondCity(value);
  };
  return (
    <>
            <div className="md:flex-row  flex flex-col fixed min-h-screen w-full z-20 bg-stone-800 bg-opacity-90 left-0 top-0 justify-center items-center">
                <div className=" bg-gray-100 w-[100vh] lg:w-[80vh] md:w-[60vh] sm:w-[40vh] h-full rounded-xl">
                    <header className="flex flex-wrap lg:flex-wrap-reverse md:flex-wrap sm:flex-wrap mb-4 z-30 py-2 px-4 text-center  bg-gray-200 rounded-t-xl justify-between items-center">
                        <div className="w-full flex justify-end px-2">
                            <button
                                className="flex justify-end align-middle text-white font-bold w-10 rounded-xl"
                                onClick={() => {setShowEventModal(false);}}
                            >
                            <span className=" cursor-pointer text-gray-400"><FaTimes /></span>
                            </button>
                        </div>
                    </header>
                    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} style={{ maxWidth: 600,}} >
                    <Form.Item
                        name="note"
                        label="Note"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Select
                        placeholder="Select a option and change input text above"
                        onChange={onGenderChange}
                        allowClear
                        >
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="province"
                        label="Province"
                        rules={[  {  required: true, }, ]}
                    >
                        <Space wrap className=''>
                        <Select
                            defaultValue={provinceData[0]}
                            style={{ width: 120, }}
                            onChange={handleProvinceChange}
                            options={ provinceData.map((province) => ({
                                label: province,
                                value: province,
                            }))}
                        />
                        </Space>
                    </Form.Item>
                    <Form.Item
                        name="city"
                        label="City"
                        rules={[  {  required: true, }, ]}
                    >
                        <Space wrap className=''>
                        <Select
                            style={{ width: 120, }}
                            value={secondCity}
                            onChange={onSecondCityChange}
                            options={ cities.map((city) => ({
                                label: city,
                                value: city,
                            }))}
                        />
                        </Space>
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                    >
                        {({ getFieldValue }) =>
                        getFieldValue('gender') === 'other' ? (
                            <Form.Item
                            name="customizeGender"
                            label="Customize Gender"
                            rules={[
                                {
                                required: true,
                                },
                            ]}
                            >
                            <Input />
                            </Form.Item>
                        ) : null
                        }
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                        Reset
                        </Button>
                        <Button type="link" htmlType="button" onClick={onFill}>
                        Fill form
                        </Button>
                    </Form.Item>
                    </Form> 


                </div>
            </div>
        </>
  );
};
export default App;