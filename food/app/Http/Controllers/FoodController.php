<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Food;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('pages.food.index', ['listFood' => Food::all()]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('pages.food.form', ['categoryList' => Category::all()]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $food = new Food();
        $name = '';
        $this->validate($request, [
            'name' => 'required',
            'discountPrice' => 'required|numeric',
            'price' => 'required|numeric',
            'category_id' => 'required',
            'description' => 'required',
            'image' => 'required|mimes:jpg,png,gif,jpeg|max: 2048',
        ], [
            'description.required' => 'Please input description',
            'discountPrice.required' => 'Please input discountPrice',
            'price.required' => 'Please input price',
            'discountPrice.numeric' => 'Please input number',
            'price.numeric' => 'Please input number',
            'category_id.required' => 'Please select category',
            'discountPrice.required' => 'Please input discountPrice',
            'image.required' => 'Please input image',
            'image.mimes' => 'Please input file image',
            'image.max' => 'Please choose image file has 2Mb'
        ]);
        $file = $request->file('image');
        $name = time() . '_' .  $file->getClientOriginalName();
        $file->move(public_path('images'), $name);
        $food->name = $request->name;
        $food->discountPrice = $request->discountPrice;
        $food->price = $request->price;
        $food->category_id = $request->category_id;
        $food->description = $request->description;
        $food->image = $name;
        $food->save();

        return redirect('/food');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return view('pages.food.foodDetail', ['food' => Food::find($id)]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function all() {
        $foods = Food::join('categories', 'foods.category_id', 'categories.id')->select('foods.*', "categories.name as category_name")->get();
        return response()->json(["success" => true, "message" => "car record created successfully", "data" => $foods]);
    }


    public function searchFood(Request $res) {
        $food_rearch = DB::table('foods')->where('name', 'like','%'.$res->name.'%')->where('discountPrice', 'like', '%'.$res->discountPrice.'%')->get();
        if(count($food_rearch) > 0){
            return response()->json(["success" => true, "message" => "car record created successfully", "data" => $food_rearch]);
        }else{
            return ["Error" => "Not found"];
        }
    }

    public function get($id){
        $food = DB::table('foods')->join('categories', 'foods.category_id', 'categories.id')->select('foods.*', "categories.name as category_name")->where('foods.id', $id)->get();
        if(count($food) > 0){
            return response()->json(["success" => true, "message" => "car record created successfully", "data" => $food]);
        }else{
            return ["Error" => "Not found"];
        }

    }

    public function getStatistical() {
        $statistical = DB::table('foods as f')->join('categories as c', 'f.category_id', '=', 'c.id')->select(DB::raw('c.name, count(f.category_id) as quantity'))->groupBy('c.id')->get();
        return  response()->json(["data" => $statistical]);
        // $count = DB::table('foods')->count('*')->get();
        // return response()->json($count);
        // $statistical = Food::select('c.name', DB::raw('count(f.category_id) as Quantity'))->leftJoin('categories as c', 'f.category_id', '=', 'c.id')->groupBy('f.category_id')->get();
        // return  response()->json($statistical);
    }



}
